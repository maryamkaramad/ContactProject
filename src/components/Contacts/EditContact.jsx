import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getContact,
    updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/Color";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from 'use-immer';
const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const { loading, setLoading, groups, setContacts, contacts, setFillteredContacts } = useContext(ContactContext)
    const [contact, setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data: contactData } = await getContact(contactId);
                setContact(contactData)
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    // const setContactInfo = (event) => {
    //     setContact({ ...contact, [event.target.name]: event.target.value })
    // };

    const submitForm = async (values) => {
        // event.preventDefault();
        try {
            setLoading(true)
            const { data, status } = await updateContact(values, contactId);
            if (status === 200) {
                // const allContacts = [...contacts]
                // // const contactIndex = allContacts.findIndex(c => c.id === +contactId)
                // allContacts[contactIndex] = { ...data }
                // console.log(allContacts[contactIndex])
                // setContacts(allContacts)
                // setFillteredContacts(allContacts)
                setContacts((draft) => {
                    const contactIndex = draft.findIndex(c => c.id === +contactId)
                    draft[contactIndex] = { ...data }
                })
                setFillteredContacts((draft) => {
                    const contactIndex = draft.findIndex(c => c.id === +contactId)
                    draft[contactIndex] = { ...data }
                })



                setLoading(false)
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    };


    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        initialValues={contact}
                                        validationSchema={contactSchema}
                                        onSubmit={(values) => {

                                            submitForm(values)
                                        }}>


                                        <Form >
                                            <div className="mb-2">
                                                <Field
                                                    id="fullname"
                                                    name="fullname"
                                                    type="text"
                                                    // value={formik.values.fullname}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("fullname")}
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                // required={true}
                                                />
                                                {/* {formik.touched.fullname && formik.errors.fullname ? (<div className="text-danger">{formik.errors.fullname}</div>) : null} */}
                                                <ErrorMessage name="fullname" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    // id="photo"
                                                    name="photo"
                                                    type="text"
                                                    // value={formik.values.photo}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("photo")}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="آدرس تصویر"
                                                />
                                                {/* {formik.touched.photo && formik.errors.photo ? (<div className="text-danger">{formik.errors.photo}</div>) : null} */}
                                                <ErrorMessage name="photo" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    // id="mobile"
                                                    name="mobile"
                                                    type="number"
                                                    // value={formik.values.mobile}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("mobile")}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="شماره موبایل"
                                                />
                                                {/* {formik.touched.mobile && formik.errors.mobile ? (<div className="text-danger">{formik.errors.mobile}</div>) : null} */}
                                                <ErrorMessage name="mobile" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    // id="email"
                                                    type="email"
                                                    name="email"
                                                    // value={formik.values.email}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("email")}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="آدرس ایمیل"
                                                />
                                                {/* {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null} */}
                                                <ErrorMessage name="email" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    // id="job"
                                                    type="text"
                                                    name="job"
                                                    // value={formik.values.job}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("job")}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="شغل"
                                                />
                                                {/* {formik.touched.job && formik.errors.job ? (<div className="text-danger">{formik.errors.job}</div>) : null} */}
                                                <ErrorMessage name="job" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    // id="group"
                                                    name="group"
                                                    as="select"

                                                    // value={formik.values.group}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // {...formik.getFieldProps("group")}
                                                    // required={true}
                                                    className="form-control"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.length > 0 &&
                                                        groups.map((group) => (
                                                            <option key={group.id} value={group.id}>
                                                                {group.name}
                                                            </option>
                                                        ))}
                                                </Field>
                                                {/* {formik.touched.group && formik.errors.group ? (<div className="text-danger">{formik.errors.group}</div>) : null} */}
                                                <ErrorMessage name="group" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                                            </div>
                                            <div className="mx-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{ backgroundColor: PURPLE }}
                                                    value="ویرایش مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{ backgroundColor: COMMENT }}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${PURPLE}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>

    )
}

export default EditContact