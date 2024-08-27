import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function AdminNavbar() {

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link href="/my-org" >
                    <Image width={150} height={35} src="/assets/img/logo.png" alt="Vizitsure Visitor Management Application" className='mx-3' data-aos-delay="150" />
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown pe-3">
                        <Link 
                            className="btn btn-info" 
                            href="/pricing" 
                            role="button">
                                Upgrade
                        </Link>

                    </li>
                    <li className="nav-item dropdown pe-3">
                        <button
                            onClick={() => signOut()}
                            className="btn btn-danger"
                        >
                            Sign Out
                        </button>

                    </li>

                </ul>
            </nav>

        </header>
    )
}
