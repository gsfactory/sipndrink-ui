
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import qs from "qs";
const moment = require("moment");
// import {getDataUrlBlob} from "../utils/utils";

class ApiClient {
    constructor() {
        axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
    }

    async getAuthHeader(req = null) {
        let header = {};
        let session = null;
        if (req) {
            session = await getSession({ req });
        } else {
            session = await getSession();
        }

        if (session && session.jwt) {
            header = { Authorization: `Bearer ${session.jwt}` };
        }

        return header;
    }

    async getErrorString(error) {
        if (error.response) {
            let errorMsg = error.response?.data?.error?.message;
            if (errorMsg) {
                return errorMsg;
            }
            return error.response.data;
        }
        return error.message;
    }

    async getUserId(req = null) {
        let session = null;
        if (req) {
            session = await getSession({ req });
        } else {
            session = await getSession();
        }
        if (session) {
            return session.id;
        }
        return "remote";
    }

    async getBusinessDetails() {
        let { data } = await axios.get(
            '/business-details'
        );
        return data;
    }

    async getTheatres() {
        let { data } = await axios.get(
            '/theatres?populate=*'
        );
        return data;
    }
    async getServices() {
        let { data } = await axios.get(
            '/services'
        );
        return data;
    }

    async getServiceDetails() {
        let { data } = await axios.get(
            '/service-details?populate=*'
        );
        return data;
    }

    async getServiceDetailsByService(serviceId) {
        let { data } = await axios.get(
            `/service-details?populate=*&filters[service][id][$eq]=${serviceId}`
        );
        return data;
    }

    async getTimeslotsByTheatre(theatreId) {
        let { data } = await axios.get(
            `/timeslots?populate=*&filters[theatre][id][$eq]=${theatreId}`
        );
        return data;
    }

    async getTheatersSlotsAvailability(theatreId, dateQuery) {
        
        // const dateQuery = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        console.log('getTheatersSlotsAvailability', dateQuery);
        let { data } = await axios.get(
            `/theatres/availability?theater=${theatreId}&date=${dateQuery}`
        );
        return data;
        // return [];
    }


    async startBooking(booking, services) {
        const { data } = await this.addBookingOrder(booking, services);
        
        //add service details in bookings
        await this.addBookingServices(data.id, services);

        // initiate payment order
        await this.initiatePayment(data.id);

        return data;
    }

    async addBookingOrder(booking, services) {
        let { data } = await axios.post(
            `/bookings`, {
            data: booking
            }
        );

        return data;
    }

    async addBookingServices(bookingId, services) {
        console.log('adding booking service for booking', bookingId);
        let promises = [];

        for (let i=0; i<services.length; i++) {
            promises[i] = axios.post(
                `/booking-services`, {
                data: {
                    booking: bookingId,
                    service_detail: services[i]
                }
            }
            );
        }

        const results = await Promise.all(promises);
        return results;
    }

    async initiatePayment(bookingId) {
        console.log('Initiating payment for booking', bookingId);
        try {
            let { data } = await axios.post(
                `/payments`, {
                data: {
                    booking: bookingId,
                }
                }
                );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getBookings(ctxReq, fromDate, toDate, page = 1, pageSize = 500) {
        const headers = await this.getAuthHeader(ctxReq);
        const newToDate = moment(toDate, 'YYYY-MM-DD').add("1", "days").format('YYYY-MM-DD');
        let query = {
            sort: ['date:desc'],
            pagination: {
                page: page,
                pageSize: pageSize
            },
            filters: {
                date: {
                    $gte: fromDate,
                    $lte: newToDate
                },
            },
            populate: '*'
        };

        const q = qs.stringify(query, { encodeValuesOnly: true });
        // console.log(q);
        try {
            let { data } = await axios.get(
                `/bookings?${q}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async getBookingById(ctxReq, id) {
        const headers = await this.getAuthHeader(ctxReq);

        try {
            let { data } = await axios.get(
                `/bookings/${id}?populate=*`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async getBookingServices(context, bookingId) {
        const headers = await this.getAuthHeader(context);
        console.log('headers', headers);

        let query = {
            filters: {
                booking: {
                    id: {
                        $eq: bookingId
                    }
                },
            },
            populate: {
                // service_detail: true, 
                // company_location: true, 
                // visitor_documents: {
                //     populate: {
                //         file: true
                //     }
                // },
                service_detail: {
                  populate: '*'
                }
            }
        };
        const q = qs.stringify(query, { encodeValuesOnly: true });
        try {
            let { data } = await axios.get(
                `/booking-services?${q}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
}

export default new ApiClient();
