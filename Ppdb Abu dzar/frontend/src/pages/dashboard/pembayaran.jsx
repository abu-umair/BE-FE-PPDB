import { fetchData, postData } from '@/services/user.service';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Pembayaran = () => {
    const [loading, setLoading] = useState(true);

    const auth = useSelector((state) => state.user);

    const [students_id, setStudents_id] = useState();
    const [price, setPrice] = useState();
    const [customer_email, setCustomer_email] = useState();
    const [customer_first_name, setCustomer_first_name] = useState();
    const [complete, setComplete] = useState(null);
    const [changeMethod, setChangeMethod] = useState(null);
    const [statusPaymentOld, setStatusPaymentOld] = useState(null);
    const [urlPaymentOld, setUrlPaymentOld] = useState(null);



    useEffect(() => {
        const getStudentById = async () => {
            try {
                const response = await fetchData('student/' + auth.userId, auth.token);
                // console.log(response.data);
                // const isComplete = response.data.status_payment === 'capture' || response.data.status_payment === 'paid';
                setComplete(response.data.status_payment === 'capture' || response.data.status_payment === 'paid' || response.data.status_payment === 'settlement');
                setChangeMethod(response.data.status_payment === 'pending');
                setStatusPaymentOld(response.data.status_payment);
                setUrlPaymentOld(response.data.checkout_link)
                console.log(response.data.status_payment);
                setStudents_id(response.data.id);
                setPrice(response.data.biaya);
                setCustomer_email(response.data.user.email);
                setCustomer_first_name(response.data.user.name);
            } catch (error) {
                console.log(error);
            }
        };
        getStudentById()
    }, [auth.userId, auth.token]);

    useEffect(() => {
        if (students_id, price, customer_email, customer_first_name) {
            setLoading(false);
        }
    }, [students_id, price, customer_email, customer_first_name]);

    const handleDaftarClick = async () => {
        // console.log(value);
        // console.log(jenjang);
        try {
            // const updatedFormData = { ...formData, selectedData: value, biaya: value, jenjang: jenjang };
            // if (statusPaymentOld === null || statusPaymentOld === 'deny' || statusPaymentOld === 'expire' || statusPaymentOld === 'cancel') {
            if (statusPaymentOld === 'pending') {
                const storedUpdateUrl = localStorage.getItem('updateUrl');
                if (storedUpdateUrl) {
                    window.location.href = storedUpdateUrl;
                } else {
                    window.location.href = urlPaymentOld;
                }
            } else {
                const dataToPost = {
                    // id: 54,
                    // price: 1111,
                    // item_name: 'PPDB',
                    // customer_email: "testttt@gmail.com",
                    // customer_first_name: "testttt",
                    id: students_id,
                    price: price,
                    item_name: "PPDB",
                    customer_email: customer_email,
                    customer_first_name: customer_first_name,
                };
                // return await postData(`student/${auth.userId}`, dataToPost, auth.token)
                return await postData('payments', dataToPost, auth.token)
                    // return await postData(`student/46`, dataToPost, auth.token)
                    .then(
                        (response) => {
                            console.log(response);
                            if (response.redirect_url) {
                                window.location.href = response.redirect_url;
                            } else {
                                console.error('Redirect URL not found in the response');
                            }
                        },
                        // (error) => {
                        //   console.log(error);
                        // }
                    );
            }
        } catch (err) {
            console.log(err);

            // CustomToast({ message: "Register Failed", type: "error" });

            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }

    };
    console.log(changeMethod);


    const handleChangeMethodClick = async () => {
        try {
            if (statusPaymentOld === 'pending') {

                const dataToPost = {
                    // id: 54,
                    // price: 1111,
                    // item_name: 'PPDB',
                    // customer_email: "testttt@gmail.com",
                    // customer_first_name: "testttt",
                    id: students_id,
                    price: price,
                    item_name: "PPDB",
                    customer_email: customer_email,
                    customer_first_name: customer_first_name,
                };
                // return await postData(`student/${auth.userId}`, dataToPost, auth.token)
                return await postData('payments', dataToPost, auth.token)
                    // return await postData(`student/46`, dataToPost, auth.token)
                    .then(
                        (response) => {
                            console.log(response);
                            if (response.redirect_url) {
                                localStorage.setItem('updateUrl', response.redirect_url);
                                window.location.href = response.redirect_url;
                            } else {
                                console.error('Redirect URL not found in the response');
                            }
                        },
                        // (error) => {
                        //   console.log(error);
                        // }
                    );
            }
        } catch (err) {
            console.log(err);

            // CustomToast({ message: "Register Failed", type: "error" });

            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className="max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 lg:px-32 lg:py-32 rounded-lg shadow">
                    <div className="flex justify-center">
                        <img src="/img/payment.svg" alt="Payment" className="mx-auto w-3/4 md:w-1/2" />
                    </div>
                    <div className="space-y-2">
                        {complete ? (
                            <Button disabled className="text-lg md:text-2xl" type="submit" fullWidth>
                                Sudah Bayar
                            </Button>
                        ) : (
                            <Button
                                className="text-lg md:text-2xl bg-[#4CAF50]"
                                type="submit"
                                fullWidth
                                onClick={() => handleDaftarClick()}
                            >
                                Bayar
                            </Button>
                        )}
                        {changeMethod ? (
                            <Button
                                className="text-lg md:text-2xl bg-[#282464]"
                                color="blue"
                                type="submit"
                                fullWidth
                                onClick={() => handleChangeMethodClick()}
                            >
                                Ganti Metode Pembayaran
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pembayaran