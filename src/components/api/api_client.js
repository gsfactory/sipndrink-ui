
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import qs from "qs";
const moment = require("moment");
import {getDataUrlBlob} from "../utils/utils";

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

    async getUserByEmail(email) {
        const authHeader = await this.getAuthHeader();
        let { data } = await axios.get(
            `/users?email=${email}`,
            {
                headers: authHeader,
            }
        );
        return data;
    }

    async getUserById(req, id) {
        const authHeader = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/users/${id}?populate=*`,
            {
                headers: authHeader,
            }
        );
        return data;
    }

    async getInlineImageFolder() {
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const year = currentTime.getFullYear();
        const uid = await this.getUserId();
        return `${uid}/${year}/${month}`;
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

    async addCompanyAdmin(userData) {
        const headers = await this.getAuthHeader();
        let { data } = await axios.post(
            `/auth/local/register`,
            userData
            ,
            {
                headers: headers,
            }
        );
        return data;
    }

    async loginCreds(userData) {
        let { data } = await axios.post(
            `/auth/callback/credentials`,
            userData
        );
        return data;
    }

    async addCompanyLocation(locationData) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/company-locations`,
                { data: locationData },
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async updateCompanyLocation(locationData, locationId) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/company-locations/${locationId}`,
                { data: locationData },
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getCompanyLocationById(req, id) {
        const authHeader = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/company-locations/${id}`,
            {
                headers: authHeader,
            }
        );
        return data;
    }

    async getCompaniesByAdmin(req) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/companies?populate=*`,
            {
                headers: headers,
            }
        );
        if (data && data.length == 0) {
            return null;
        }
        return data;
    }
    async getCompanyLocations(req) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/company-locations?populate=*`,
            {
                headers: headers,
            }
        );
        if (data && data.length == 0) {
            return null;
        }
        return data;
    }

    async deleteDepartment(id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.delete(
                `/company-departments/${id}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getStaffsByCompany(req, companyId) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/company-staffs?filters[company][id][$eq]=${companyId}&ignoreactive=1&populate=*`, {
            headers: headers,
        }
        );
        if (data && data.length == 0) {
            return null;
        }
        return data;
    }

    async getStaffById(req, id) {
        const authHeader = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/company-staffs/${id}`,
            {
                headers: authHeader,
            }
        );
        return data;
    }

    async addStaff(staffData) {
        const headers = await this.getAuthHeader();
            
        let { data } = await axios.post(
            `/company-staffs`,
            { data: { ...staffData } }
            ,
            {
                headers: headers,
            }
        );
        return data;
    }
    async updateStaff(staffData, id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/company-staffs/${id}`,
                {
                    data: staffData
                }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async deleteStaff(id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.delete(
                `/company-staffs/${id}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async getStaffsVisits(req) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/company-staffs/visits`, {
            headers: headers,
        }
        );
        if (data && data.length == 0) {
            return null;
        }
        return data;
    }

    async getDepartments(req) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/company-departments?fetchAll=true`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getMyProfile(req) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/users/me?populate=*`,
            {
                headers: headers,
            }
        );
        return data;
    }
    async getDepartmentById(req, id) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/company-departments/${id}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async addDepartment(departmentData) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/company-departments`,
                { data: { ...departmentData } }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async updateDepartment(departmentData, id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/company-departments/${id}`,
                {
                    data: departmentData
                }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getStaffs(req) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/company-staffs`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }


    async addAuthenticatedUser(userData, role=1) {
        const { address, company, company_location, email, mobile, password, username, name } = userData;
        const headers = await this.getAuthHeader();

        let { data } = await axios.post(
            `/users`,
            { address, company, company_location: parseInt(company_location), email, name, mobile, password, username, confirmed: true, role: role }
            ,
            {
                headers: headers,
            }
        );
        return data;
    }

    async updateAuthenticatedUser(userData, id) {
        const { address, company, company_location, email, name, mobile, password, username } = userData;
        const headers = await this.getAuthHeader();
        let { data } = await axios.put(
            `/users/${id}`,
            { address, company, company_location: parseInt(company_location), email, name, mobile, password, username, role: 1 }
            ,
            {
                headers: headers,
            }
        );
        return data;
    }

    async changeMyPassword(currentPassword, newPassword) {
        const headers = await this.getAuthHeader();
        let { data } = await axios.post(
            `/auth/change-password`,{
                currentPassword: currentPassword,
                password: newPassword,
                passwordConfirmation: newPassword
            },{
                headers: headers,
            }
        );
    }
    async resetPasswordInitiate(email) {
        const headers = await this.getAuthHeader();
        await axios.post(
            `/auth/forgot-password`,{
                email: email
            },{
                headers: headers,
            }
        );
    }
    async resetPasswordConfirm(args) {
        const headers = await this.getAuthHeader();
        await axios.post(
            `/auth/reset-password`,{
                code: args.code,
                password: args.password,
                passwordConfirmation: args.password
            },{
                headers: headers,
            }
        );
    }

    async changePassword(userId, newPassword) {
        const headers = await this.getAuthHeader();
        let { data } = await axios.put(`/users/${userId}/changepassword`,{
            data: {
                "userId": userId,
                "password": newPassword
            }
            },{
                headers: headers,
            }
        );
    }

    //get all users for the company this user is associated with
    async getAllUsers(req, isAdmin = false) {
        const headers = await this.getAuthHeader(req);
        let uri = `/users?filters[role][name][$eq]=authenticated&populate=*`;
        if (isAdmin) {
            uri = `/users?filters[role][name][$eq]=company_admin&populate=*`;
        }
        try {
            let { data } = await axios.get(
                uri,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async getQuestionCategories(req) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                '/question-categories',
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async approveRemoteBooking(verifyId, message = '') {
        await axios.put(
            `/remote-bookings/approve/${verifyId}`,
            {
                data: {
                    message: message
                }
            }
        );
    }
    async rejectRemoteBooking(verifyId, message) {
        await axios.put(
            `/remote-bookings/reject/${verifyId}`,
            {
                data: {
                    message: message
                }
            }
        );
    }
    async markVisitOutFromRemote(verifyId) {
        await axios.put(
            `remote-bookings/visits/${verifyId}/status/out`,
            {
                data: {
                    // timestamp fix, where local time was not going.
                    // and due to server being in a different timezone
                    // the time was not matching
                    timestamp: new Date().toISOString(),
                }
            }
        );
    }

    async getVisitDetailsByVerificationId(verifyId) {
        let { data } = await axios.get(
            `/visits/verify/${verifyId}?populate=*`
        );
        return data;
    }

    async addCompany(args) {
        const headers = await this.getAuthHeader();
        let { data } = await axios.post(
            `/companies`, {
            data: {
                address: args.address,
                city: args.city,
                country: args.country,
                email: args.email,
                mobile: args.mobile,
                name: args.name,
                state: args.state
            }
        }, {
            headers: headers,
        }
        );
        return data;
    }

    async updateCompany(companyData, id) {
        const headers = await this.getAuthHeader();
        const logo = companyData.logo;
        const photos = companyData.photos;
        delete companyData.photos;
        delete companyData.logo;

        let { data } = await axios.put(
            `/companies/${id}`,
            {
                data: companyData
            }
            ,
            {
                headers: headers,
            }
        );
        if (logo) {
            await this.uploadFile(
                logo, id, "api::company.company", "logo"
            );
        }
        return data;
    }

    async uploadFile(files, refId, ref, field) {
        let headers = await this.getAuthHeader();

        const imageData = new FormData();
        imageData.append("files", files[0]);
        imageData.append("refId", refId);
        imageData.append("ref", ref);
        imageData.append("field", field);
        imageData.append("path", await this.getInlineImageFolder());

        const data = await axios.post(`/upload`,
            imageData
            , {
                headers: headers,
            });
        return data;
    }

    async uploadFileAsDataUrl(dataUrl, filename, refId, ref, field) {
        let headers = await this.getAuthHeader();

        const imageData = new FormData();
        imageData.append("files", dataUrl, filename);
        imageData.append("refId", refId);
        imageData.append("ref", ref);
        imageData.append("field", field);
        imageData.append("path", await this.getInlineImageFolder());

        const data = await axios.post(`/upload`,
            imageData
            , {
                headers: headers,
            });
        return data;
    }

    async getVisitsDeprecated(req, fromDate, toDate, filterType=null, filterTypeValue=null, page = 1, pageSize = 25) {
        const headers = await this.getAuthHeader(req);
        const newToDate = moment(toDate, 'YYYY-MM-DD').add("1", "days").format('YYYY-MM-DD');
        let query = {
            sort: ['createdAt:desc'],
            pagination: {
                page: page,
                pageSize: pageSize
            },
            filters: {
                createdAt: {
                    $gte: fromDate,
                    $lte: newToDate
                },
            },
            populate: {
                company: true, 
                company_location: true, 
                visitor_documents: {
                    populate: {
                        file: true
                    }
                },
                visitor: {
                  populate: '*'
                }
            }
        };
        if (filterType && filterTypeValue) {
            if (filterType === 'status') {
                query.filters[filterType] = {
                    $eq: filterTypeValue
                };
            }
            else {
                query.filters['visitor'] = {};
                query.filters['visitor'][filterType] = {
                    $contains: filterTypeValue
                };
            }
        }
        const q = qs.stringify(query, { encodeValuesOnly: true });
        try {
            let { data } = await axios.get(
                `/visits?${q}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getFilterVisits(key, value) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.get(
                `/visits?sort[0]=createdAt:desc&populate=*&filters${key === 'status' ? `[${key}][$eq]=${value}` : `[visitor][${key}][$contains]=${value}`}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getFilterVisitors(key, value) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.get(
                `/visitors?sort[0]=createdAt:desc&populate=*&filters${`[${key}][$contains]=${value}`}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async getVisitById(req, id) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/visits/${id}?populate=*`,
            {
                headers: headers,
            }
        );
        return data;
    }

    async getVisitorDocuments(req, visitorId) {
        const headers = await this.getAuthHeader(req);
        let q = {
            sort: ['createdAt:desc'],
            pagination: {
                page: 1,
                pageSize: 100
            },
            filters: {
                visitor: visitorId,
            },
            'populate': '*'
        };
        const query = qs.stringify(q, { encodeValuesOnly: true });
        let { data } = await axios.get(
            `/visitor-documents?${query}`,
            {
                headers: headers,
            }
        );
        return data;
    }

    async updateAppointmentDate(visitId, appointmentDate) {
        let { data } = await axios.put(
            `/remote-bookings/visits/${visitId}/appointmentDate`,
            { data: { 
                appointmentDate: appointmentDate
            }}
        );
        return data;
    }
    async addVisits(visitsData) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/visits`,
                { data: { ...visitsData, checkin: new Date() } }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async _addVisitFromRemote(visitsData, guid, documentIds) {
        console.log('adding visitor-docs to visit', documentIds);
        let { data } = await axios.post(
            `/remote-bookings/visits`,
            {
                data: {
                    ...visitsData,
                    random_guid: guid,
                    visitor_documents: documentIds
                }
            }
        );
        return data;
    }

    async updateVisitStatus(status, id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/visits/${id}/${status}`, {},
                {
                    headers
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getVisitors(req, fromDate, toDate, filterType=null, filterTypeValue=null, page = 1) {
        const headers = await this.getAuthHeader(req);
        const newToDate = moment(toDate, 'YYYY-MM-DD').add("1", "days").format('YYYY-MM-DD');
        let query = {
            sort: ['createdAt:desc'],
            pagination: {
                page: page
            },
            filters: {
                createdAt: {
                    $gte: fromDate,
                    $lte: newToDate
                },
            },
            'populate': '*'
        };
        if (filterType && filterTypeValue) {
            query.filters[filterType] = {
                $contains: filterTypeValue
            };
        }
        const q = qs.stringify(query, { encodeValuesOnly: true });
        try {
            let { data } = await axios.get(
                `/visitors?${q}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async getVisitorById(req, id) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/visitors/${id}?populate=*`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async addVisitor(visitorData) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/visitors`,
                { data: visitorData }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async updateProfile(id, profile) {
        const profileFile = profile.profile_file;
        delete profile.profile_file;

        let toUpdate = {
            name: profile.name,
            mobile: profile.mobile,
            username: profile.username
        };
        if (profile.email && profile.email != "") {
            toUpdate.email = profile.email;
        }

        const headers = await this.getAuthHeader();
        let { data } = await axios.put(
            `/users/${id}`,
            toUpdate,
            {
                headers
            }
        );
        
        // add/update profile image, if any
        if (profileFile) {
            //upload
            await this.uploadFile(
                profileFile, id, "plugin::users-permissions.user", "profile"
            );
        }
    }

    async addRemoteVisit(visitorData, visitorDocuments, visitData, companyId, guid, remoteBookingId, questionsAnswered) {
        delete visitorData.profileImage;
        const profileFile = visitorData.profile_file;
        delete visitorData.profile_file;
        
        // add/update visitor
        const visitorObj = await this._addRemoteVisitor(visitorData, guid);
        
        // add/update profile image, if any
        if (profileFile) {
            //upload
            //gorav
            const filename = "profile.jpg";
            const blob = await getDataUrlBlob(profileFile);
            await this.uploadFileAsDataUrl(
                blob, filename, visitorObj.id, "api::visitor.visitor", "profile"
            );
        }

        let documentIds = [];
        if (visitorDocuments && 'document_files' in visitorDocuments) {
            for (let i = 0; i < visitorDocuments.document_files.length; i++) {
                if (visitorDocuments.document_files[i].file) {
                    const visitorDocument = await this.addVisitorDocument({
                        file: [visitorDocuments.document_files[i].file],
                        type: visitorDocuments.document_files[i].fileType,
                    }, visitorObj.id, guid);
                    documentIds.push(visitorDocument.id);
                }
            }
            console.log('Document uploads success');

            // await this.addVisitorDocument({
            //     file: visitorDocument.document_file,
            //     type: visitorDocument.document_type,
            // }, visitorObj.id, guid);
        }

        //save question-answers
        if (questionsAnswered && questionsAnswered.length > 0) {
            await this.saveQuestionAnswers(questionsAnswered, visitorObj.id, companyId);
        }

        //add visit data
        visitData['visitor'] = visitorObj.id;
        visitData['random_guid'] = guid;
        visitData['remote_booking'] = remoteBookingId;
        return await this._addVisitFromRemote(visitData, guid, documentIds);
    }

    async _addRemoteVisitor(visitorData, guid) {
        let res = null;
        if ('id' in visitorData) {
            //update visitor
            let { data } = await axios.put(
                `/remote-bookings/visitors/${visitorData.id}`,
                { data: visitorData }
            );
            res = data;
        }
        else {
            //create visitor
            let { data } = await axios.post(
                `/remote-bookings/visitors`,
                {
                    data: {
                        ...visitorData,
                        random_guid: guid
                    }
                }
            );
            res = data;
        }
        
        return res;
    }

    async addVisitorDocument(documents, id, random_guid) {
        const file = documents.file;
        delete documents.file;

        let { data } = await axios.post(
            `/remote-bookings/visitor-documents`,
            {
                data: { 
                    ...documents, 
                    random_guid: random_guid,
                    visitor: id
                }
            }
        );
        if (file) {
            await this.uploadFile(
                file, data.id, "api::visitor-document.visitor-document", "file"
            );
        }
        return data;
    }

    async saveQuestionAnswers(qAnswers, visitorId, companyId) {
        const headers = await this.getAuthHeader();

        for (let i=0; i<qAnswers.length; i++) {
            await axios.post(
                `/question-answers`,
                {
                    data: {
                        answer: qAnswers[i].answer,
                        question: qAnswers[i].question_id,
                        visitor: visitorId,
                        company: companyId
                    }
                },{
                    headers: headers,
                }
            );
        }
    }

    async getAnswers(visitorId, companyId, beforeTs, afterTs) {
        //get answers from api
        const headers = await this.getAuthHeader();

        let query = {
            filters: {
                createdAt: {
                    $gte: beforeTs,
                    $lte: afterTs
                },
                visitor: visitorId,
                company: companyId
            },
            populate: {
                question: true
            }
        };
        const q = qs.stringify(query, { encodeValuesOnly: true });
        console.log('query', q);
        let { data } = await axios.get(
            `/question-answers?${q}`,
            {
                headers: headers,
            }
        );
        return data;
    }

    async initiateOrder(subscriptionId) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/payments`, {
                data: {
                    subscription: subscriptionId,
                }
            }
                , {
                    headers: headers,
                });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async finalizePayment(args) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/payments/finalize`, {
                data: {
                    pg_payment_id: args.razorpay_payment_id,
                    pg_order_id: args.razorpay_order_id,
                    pg_signature: args.razorpay_signature
                }
            }
                , {
                    headers: headers,
                });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getPaymentsHistory(req) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/payments?populate=subscription&filters[status][$eq]=success`, {
                headers: headers,
            });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getSubscription() {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.get(
                `/subscriptions`, {
                headers: headers,
            });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getSubscriptionMeta(req) {
        const headers = await this.getAuthHeader(req);
        let { data } = await axios.get(
            `/subscription-metas`, {
            headers: headers,
        });
        return data;
    }

    // question answer flow
    async getQuestionnaires(req, companyId) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/questionaires?filters[company][id][$eq]=${companyId}&populate=*`, {
                headers: headers,
            });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getCompanyMeta(req, companyId) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/company-metas?populate=*&filters[company][id][$eq]=${companyId}`, {
                headers: headers,
            });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }


    async getQuestionsById(req, id) {
        const headers = await this.getAuthHeader(req);
        try {
            let { data } = await axios.get(
                `/questionaires/${id}?populate=*`, {
                headers: headers,
            });
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async addQuestions(questionData) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.post(
                `/questionaires`,
                { data: questionData }
                ,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async updateCompanyMeta(id, dataToUpdate) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/company-metas/${id}`,
                { data: dataToUpdate },
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async updateQuestion(questionData, questionId) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.put(
                `/questionaires/${questionId}`,
                { data: questionData },
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async deleteQuestions(id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.delete(
                `/questionaires/${id}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }
    async deleteVideo(id) {
        const headers = await this.getAuthHeader();
        try {
            let { data } = await axios.delete(
                `/upload/files/${id}`,
                {
                    headers: headers,
                }
            );
            return data;
        } catch (error) {
            return null
        }
    }

    async updateVideo(id, files) {
        const headers = await this.getAuthHeader();
        const data = await this.uploadFile(
            files, id, "api::company-meta.company-meta", "guideline_video"
        );
        return data;
    }

    async getCurrentUserDetails(token) {
        let { data } = await axios.get(
            `/users/me?populate=role&populate=company`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return data;
    }
    // async getCompanyMeta(req) {
    //     const headers = await this.getAuthHeader(req);
    //     try {
    //         let { data } = await axios.get(
    //             `/company-metas/my`,
    //             {
    //                 headers: headers,
    //             }
    //         );
    //         return data;
    //     } catch (error) {
    //         console.log(error.response.data);
    //         return null
    //     }
    // }

    /////////Remote booking
    async getCompanyByRandomGuid(randomGuid) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/company`
        );
        return data;
    }
    async getVideoByRandomGuid(randomGuid) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/video`
        );
        return data;
    }
    async getQuestionsByRandomGuid(randomGuid) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/questions`
        );
        return data;
    }
    async getDepartmentsByRandomGuid(randomGuid) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/departments`
        );
        return data;
    }
    async getLocationsByRandomGuid(randomGuid) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/locations`
        );
        return data;
    }
    async getVisitorByRandomGuidAndMobile(randomGuid, mobile) {
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/visitor/mobile/${mobile}`
        );
        return data;
    }
    async searchStaff(randomGuid, departmentName, nameContains) {
        departmentName = departmentName || 'dummy';
        let { data } = await axios.get(
            `/remote-bookings/${randomGuid}/dept/${departmentName}/staff/${nameContains}`
        );
        return data;
    }
    async startRemoteVisit(args) {
        let { data } = await axios.post(
            `/remote-bookings`,
            {
                data: {
                    mobile: args.mobile,
                    random_guid: args.random_guid
                }
            }
        );
        return data;
    }
    async validateRemoteVisit(remoteRequestId, otp) {
        try {
            await axios.post(
                `/remote-bookings/validate`,
                {
                    data: {
                        request_id: remoteRequestId,
                        otp: otp
                    }
                }
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async getVisits(args, req) {
        const headers = await this.getAuthHeader(req);

        let query = {
            filters: {
                createdAt: {
                    $gte: args.fromDate,
                },
                company: args.companyId
            },
            populate: {
                visitor: true
            }
        };
        if (args.toDate) {
            query.filters.createdAt.$lte = args.toDate;
        }
        if (args.filters) {
            query.filters = { ...query.filters, ...args.filters };
        }
        if (args.pagination) {
            query.pagination = args.pagination;
        }
        const q = qs.stringify(query, { encodeValuesOnly: true });
        let { data } = await axios.get(
            `/visits?${q}`,
            {
                headers: headers,
            });
        return data;
    }

    async getVisitsCount(args, req) {
        const headers = await this.getAuthHeader(req);

        let query = {
            filters: {
                createdAt: {
                    $gte: args.fromDate,
                },
                company: args.companyId
            },
            pagination: {
                pageSize: 1
            }
        };
        if (args.toDate) {
            query.filters.createdAt.$lte = args.toDate;
        }
        if (args.filters) {
            query.filters = { ...query.filters, ...args.filters };
        }
        const q = qs.stringify(query, { encodeValuesOnly: true });
        let { data } = await axios.get(
            `/visits?${q}`,
            {
                headers: headers,
            });
        if (data) {
            return data.meta?.pagination?.total || 0;
        }
        return 0;
    }

    async getVisitorsCount(args, req) {
        //fromDate, toDate = null) {
        const headers = await this.getAuthHeader(req);

        let query = {
            filters: {
                createdAt: {
                    $gte: args.fromDate,
                },
                company: args.companyId
            },
            pagination: {
                pageSize: 1
            }
        };
        if (args.toDate) {
            query.filters.createdAt.$lte = args.toDate;
        }
        if (args.filters) {
            query.filters = { ...query.filters, ...args.filters };
        }
        const q = qs.stringify(query, { encodeValuesOnly: true });
        let { data } = await axios.get(
            `/visitors?${q}`,
            {
                headers: headers,
            });
        if (data) {
            return data.meta?.pagination?.total || 0
        }
        return 0;
    }

    async updateCompanyTimings(companyMetaId, timingsData) {
        const headers = await this.getAuthHeader();
        let { data } = await axios.put(
            `/company-metas/${companyMetaId}`,
            { data: {
                work_timings: timingsData
            } },
            {
                headers: headers,
            }
        );
        return data;
    }

    async getRedirectUrl(shortCode) {
        let { data } = await axios.get(
            `/shortlinks/?filters[short_code][$eq]=${shortCode}`
        );
        return data;
    }

    async generateOtp(mobile) {
        let { data } = await axios.post(
            `/otps`,
            {
                "data": {
                    "mobile": mobile
                }
            }
        );
        return data;
    }
}

export default new ApiClient();
