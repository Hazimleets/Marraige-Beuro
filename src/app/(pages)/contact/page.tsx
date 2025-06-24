"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  FaPhone,
  // FaEnvelope,
  // FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ContactFormData) => {
    setLoading(true);
    try {
      const message = `
*New Contact Form Submission*

Name: ${values.name}
Email: ${values.email}
Phone: ${values.phone}
Subject: ${values.subject}
Message: ${values.message}
      `;

      const whatsappNumber = "923367690594";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      await Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonText: "Send to WhatsApp",
      });

      window.open(whatsappUrl, "_blank");
      form.resetFields();
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-rose-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-rose-600 max-w-2xl mx-auto font-light">
            Get in touch with us for any inquiries about our marriage bureau
            services. We&apos;re here to help you find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-10 border border-rose-100">
            <h2 className="text-3xl font-serif font-semibold text-rose-800 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="bg-rose-50 p-3 rounded-full">
                  <FaPhone className="text-rose-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-rose-800 text-lg">Phone</h3>
                  <p className="text-rose-600">+92 111 00000000</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-green-50 p-3 rounded-full">
                  <FaWhatsapp className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-rose-800 text-lg">
                    WhatsApp
                  </h3>
                  <p className="text-rose-600">+92 111 00000000</p>
                </div>
              </div>

              {/* <div className="flex items-start space-x-5">
                <div className="bg-blue-50 p-3 rounded-full">
                  <FaEnvelope className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-rose-800 text-lg">Email</h3>
                  <p className="text-rose-600">
                    info@chishtimarriagebureau.com
                  </p>
                </div>
              </div> */}

              {/* <div className="flex items-start space-x-5">
                <div className="bg-red-50 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-red-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-rose-800 text-lg">Address</h3>
                  <p className="text-rose-600">
                    123 Marriage Street, Lahore, Pakistan
                  </p>
                </div>
              </div> */}
            </div>

            {/* Business Hours */}
            <div className="mt-12">
              <h3 className="font-medium text-rose-800 text-lg mb-4">
                Business Hours
              </h3>
              <div className="space-y-3">
                <p className="text-rose-600">
                  Monday - Sunday : 9:00 AM - 9:00 PM
                </p>
                {/* <p className="text-rose-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-rose-600">Sunday: Closed</p> */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-10 border border-rose-100">
            <h2 className="text-3xl font-serif font-semibold text-rose-800 mb-8">
              Send us a Message
            </h2>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label={
                  <span className="text-rose-800 font-medium">Full Name</span>
                }
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  placeholder="Enter your full name"
                  className="h-12 rounded-lg border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="text-rose-800 font-medium">Email</span>}
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  className="h-12 rounded-lg border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <span className="text-rose-800 font-medium">
                    Phone Number
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  placeholder="Enter your phone number"
                  className="h-12 rounded-lg border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label={
                  <span className="text-rose-800 font-medium">Subject</span>
                }
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input
                  placeholder="Enter subject"
                  className="h-12 rounded-lg border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </Form.Item>

              <Form.Item
                name="message"
                label={
                  <span className="text-rose-800 font-medium">Message</span>
                }
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter your message"
                  rows={4}
                  className="resize-none rounded-lg border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-14 text-lg font-medium bg-white text-rose-600 border-2 border-rose-200 hover:bg-rose-50 hover:border-rose-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
