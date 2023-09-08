import React, { useEffect, useContext, useState } from 'react';
import "./adminProfile.css";
import { AuthDataContext, useSidebar, useAuthData } from '../../../../store';
import UpdatePasswordApi from '../../../../Services/UpdatePassword';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AdminProfile = () => {
    const { isSidebarOpen } = useSidebar();
    // const { authData, setAuthData } = useAuthData();
    // const { authData } = useAuthData();
    const { authData } = useContext(AuthDataContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handlePasswordUpdate = async () => {
        try {
            const adminId = authData?.data?._id;
            // Check if the old password and new password are the same
            if (!newPassword) {
                setModalMessage('New password cannot be empty');
                setShowErrorModal(true);
                return;
            }
            if (oldPassword === newPassword) {
                setModalMessage('Old and new passwords cannot be the same');
                setShowErrorModal(true);
                return;
            }
            if (newPassword !== confirmPassword) {
                setModalMessage('New password and confirm password must match');
                setShowErrorModal(true);
                return;
            }
            else if (oldPassword === "") {
                setModalMessage('Old password incorrect or empty. Check Please!!');
                setShowErrorModal(true);
                return;
            }

            const response = await UpdatePasswordApi(adminId, oldPassword, newPassword);

            // if (response?.data?.success) {
            //     setModalMessage(response.message);
            //     setShowModal(true);
            // } else {
            //     setModalMessage('Password update failed');
            //     setShowModal(true);
            // }
            if (response?.success) {
                setModalMessage(response?.data?.message || 'Password Updated.');
                setShowModal(true);
            } else if (response?.message === 'Old password is wrong.') {
                setModalMessage(response?.data?.message || 'Old password is wrong.');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };
    const handleErrorCloseModal = () => {
        setShowErrorModal(false);
    };

    useEffect(() => {
        console.log(authData);
    }, [authData]);

    return (
        <>
            <Modal show={showErrorModal} onHide={handleErrorCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Password Update Failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleErrorCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* // */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Password Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-6 col-md-12">
                                <div className="card user-card-full">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-12 bg-left-grad user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                <h6 className="f-w-600">Admin ITS</h6>
                                                <p>Web Designer</p>
                                                <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Admin Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{authData?.data?.email || "techon@gmail.com"}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">+92334567890</h6>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Password Update</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Old Password</p>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    value={oldPassword}
                                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">New Password</p>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Confirm Password</p>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)} // Step 2
                                                                />
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary mt-3" onClick={handlePasswordUpdate}>
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Password Update</h6> */}

                                                {/* <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Users</p>
                                                        <h6 className="text-muted f-w-400">...xyz</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">More Details</p>
                                                        <h6 className="text-muted f-w-400">XYZ</h6>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProfile;
