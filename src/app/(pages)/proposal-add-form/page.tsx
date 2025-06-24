"use client";

import React, { useState } from "react";
import { Form, Input, Select, InputNumber, Button, Card, Row, Col } from "antd";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

const { Option } = Select;

// Add caste options array
const casteOptions = [
  "Gujjar",
  "Rajput",
  "Jutt",
  "Arain",
  "Syed",
  "Pathan",
  "Baloch",
  "Awan",
  "Sheikh",
  "Mughal",
  "Chaudhry",
  "Mirza",
  "Qureshi",
  "Malik",
  "Meo (Mewati)",
  "Butt",
  "Kamboh",
  "Khokhar",
  "Tareen",
  "Lodhi",
  "Ansari",
  "Arain",
  "Baghban",
  "Bhatti",
  "Chandio",
  "Dahar",
  "Dhareja",
  "Farooqi",
  "Gabol",
  "Gardezi",
  "Ghazi",
  "Gill",
  "Hijazi",
  "Hiraj",
  "Hunzai",
  "Ismaili",
  "Jafri",
  "Jatoi",
  "Junejo",
  "Kakakhel",
  "Kharal",
  "Khattak",
  "Koreja",
  "Leghari",
  "Lohar",
  "Mahar",
  "Makhdoom",
  "Malik",
  "Memon",
  "Mian",
  "Mohajir",
  "Mughal",
  "Nagori",
  "Niazi",
  "Panhwar",
  "Paracha",
  "Pirzada",
  "Qazi",
  "Qazilbash",
  "Rahimoon",
  "Rais",
  "Sadozai",
  "Sahito",
  "Sajidi",
  "Sammo",
  "Sarbani",
  "Shah",
  "Shaikh",
  "Sial",
  "Soomro",
  "Sulehria",
  "Suri",
  "Talpur",
  "Tanoli",
  "Teghani",
  "Tiwana",
  "Turk",
  "Umrani",
  "Virk",
  "Wagha",
  "Wattoo",
  "Yousafzai",
  "Zardari",
  "Other",
];

interface FormData {
  gender: string;
  name: string;
  age: number;
  maritalStatus: string;
  height: string;
  disability: string;
  designation: string;
  caste: string;
  customCaste?: string;
  sect: string;
  qualification: string;
  university: string;
  propertySize: string;
  homeOwnership: string;
  location: string;
  carAvailable: string;
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  brothersMarried: number;
  brothersDetails: string;
  sisters: number;
  sistersMarried: number;
  sistersDetails: string;
  address: string;
  requirements: {
    ageLimit: number;
    height: string;
    city: string;
    caste: string;
    customCaste?: string;
    qualification: string;
  };
}

const RistaForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showCustomCaste, setShowCustomCaste] = useState(false);

  const initialValues: FormData = {
    gender: "",
    name: "",
    age: 18,
    maritalStatus: "",
    height: "",
    disability: "",
    designation: "",
    caste: "",
    customCaste: "",
    sect: "",
    qualification: "",
    university: "",
    propertySize: "",
    homeOwnership: "",
    location: "",
    carAvailable: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: 0,
    brothersMarried: 0,
    brothersDetails: "",
    sisters: 0,
    sistersMarried: 0,
    sistersDetails: "",
    address: "",
    requirements: {
      ageLimit: 18,
      height: "",
      city: "",
      caste: "",
      customCaste: "",
      qualification: "",
    },
  };

  const generateWhatsAppMessage = (values: FormData): string => {
    const message = `
*I am sending proposal from your Website*

*_________________________________*

*New Marriage Proposal Submission*

*Personal Information:*
- Name: ${values.name}
- Gender: ${values.gender}
- Age: ${values.age}
- Marital Status: ${values.maritalStatus}
- Height: ${values.height}
- Disability: ${values.disability || "None"}

*Religion Details:*
- Caste: ${values.caste === "Other" ? values.customCaste : values.caste}
- Sect/Maslak: ${values.sect}

*Professional Details:*
- Designation: ${values.designation}

*Education Details:*
- Qualification: ${values.qualification}
- University: ${values.university}

*Property Details:*
- Property Size: ${values.propertySize}
- Home Ownership: ${values.homeOwnership}
- Location: ${values.location}
- Car Available: ${values.carAvailable}

*Family Details:*
- Father's Occupation: ${values.fatherOccupation}
- Mother's Occupation: ${values.motherOccupation}
- Brothers: ${values.brothers} (Married: ${values.brothersMarried})
- Sisters: ${values.sisters} (Married: ${values.sistersMarried})
- Brothers Details: ${values.brothersDetails}
- Sisters Details: ${values.sistersDetails}

*Address:*
${values.address}

*Requirements:*
- Age Limit: ${values.requirements.ageLimit}
- Height: ${values.requirements.height}
- City: ${values.requirements.city}
- Caste: ${
      values.requirements.caste === "Other"
        ? values.requirements.customCaste
        : values.requirements.caste
    }
- Qualification: ${values.requirements.qualification}


*_________________________________*

Thanks
    `;

    return encodeURIComponent(message.trim());
  };

  const onFinish = async (values: FormData) => {
    setLoading(true);

    try {
      await axios.post("/api/proposal", values);

      await Swal.fire({
        title: "Success!",
        text: "Your profile has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Generate WhatsApp message and open chat
      const whatsappMessage = generateWhatsAppMessage(values);
      const whatsappUrl = `https://wa.me/923367690594?text=${whatsappMessage}`;
      // const whatsappUrl = `https://wa.me/923419385624?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank");

      form.resetFields();
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "There was  an error submitting your profile. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add handlers for caste selection
  const handleCasteChange = (value: string) => {
    setShowCustomCaste(value === "Other");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <Card
          title={
            <h1 className="md:text-3xl font-serif text-rose-800 text-center mb-2">
              Chishti Marriage Bureau
            </h1>
          }
          className="shadow-2xl rounded-2xl border-2 border-rose-100 bg-white/95 backdrop-blur-sm"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            className="p-6 md:p-4 space-y-6"
          >
            {/* Personal Information Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Personal Information
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="name"
                    label={
                      <span className="text-gray-700 font-medium">Name</span>
                    }
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      placeholder="Enter your name"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="gender"
                    label={
                      <span className="text-gray-700 font-medium">Gender</span>
                    }
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
                  >
                    <Select placeholder="Select gender" className="rounded-lg">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="age"
                    label={
                      <span className="text-gray-700 font-medium">Age</span>
                    }
                    rules={[{ required: true, message: "Please enter age" }]}
                  >
                    <InputNumber
                      min={18}
                      max={100}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="maritalStatus"
                    label={
                      <span className="text-gray-700 font-medium">
                        Marital Status
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select marital status",
                      },
                    ]}
                  >
                    <Select placeholder="Select status" className="rounded-lg">
                      <Option value="single">Single</Option>
                      <Option value="divorced">Divorced</Option>
                      <Option value="widowed">Widowed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="height"
                    label={
                      <span className="text-gray-700 font-medium">Height</span>
                    }
                    rules={[{ required: true, message: "Please enter height" }]}
                  >
                    <Input
                      placeholder="e.g., 5.6"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="disability"
                    label={
                      <span className="text-gray-700 font-medium">
                        Disability (if any)
                      </span>
                    }
                  >
                    <Input
                      placeholder="Enter if any disability"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Religion Details Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Religion Details
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="caste"
                    label={
                      <span className="text-gray-700 font-medium">Caste</span>
                    }
                    rules={[
                      { required: true, message: "Please select your caste" },
                    ]}
                  >
                    <Select
                      placeholder="Select your caste"
                      onChange={handleCasteChange}
                      className="rounded-lg"
                    >
                      {casteOptions.map((caste) => (
                        <Option key={caste} value={caste}>
                          {caste}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {showCustomCaste && (
                    <Form.Item
                      name="customCaste"
                      rules={[
                        { required: true, message: "Please enter your caste" },
                      ]}
                    >
                      <Input
                        placeholder="Enter your caste"
                        className="rounded-lg border-rose-200 focus:border-rose-400"
                      />
                    </Form.Item>
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sect"
                    label={
                      <span className="text-gray-700 font-medium">
                        Sect/Maslak
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter your sect" },
                    ]}
                  >
                    <Input
                      placeholder="Enter your sect"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Requirements Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Requirements
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name={["requirements", "ageLimit"]}
                    label={
                      <span className="text-gray-700 font-medium">
                        Age Limit
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter age limit" },
                    ]}
                  >
                    <InputNumber
                      min={18}
                      max={100}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name={["requirements", "height"]}
                    label={
                      <span className="text-gray-700 font-medium">Height</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter height requirement",
                      },
                    ]}
                  >
                    <Input
                      placeholder="e.g., 5.6"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name={["requirements", "city"]}
                    label={
                      <span className="text-gray-700 font-medium">City</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter city requirement",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter city"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={["requirements", "caste"]}
                    label={
                      <span className="text-gray-700 font-medium">Caste</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select caste requirement",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select caste requirement"
                      className="rounded-lg"
                    >
                      {casteOptions.map((caste) => (
                        <Option key={caste} value={caste}>
                          {caste}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={["requirements", "qualification"]}
                    label={
                      <span className="text-gray-700 font-medium">
                        Qualification
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter qualification requirement",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter qualification requirement"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Professional Details Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Professional Details
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="designation"
                    label={
                      <span className="text-gray-700 font-medium">
                        Designation/Profession
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter your designation",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your designation"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Education Details Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Education Details
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="qualification"
                    label={
                      <span className="text-gray-700 font-medium">
                        Qualification
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter your qualification",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your qualification"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="university"
                    label={
                      <span className="text-gray-700 font-medium">
                        University
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter your university",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your university"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Property Details Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Property Details
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="propertySize"
                    label={
                      <span className="text-gray-700 font-medium">
                        Property Size
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter property size" },
                    ]}
                  >
                    <Input
                      placeholder="e.g., 10 Marlas"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="homeOwnership"
                    label={
                      <span className="text-gray-700 font-medium">
                        Home Ownership
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter home ownership",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select ownership"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    >
                      <Option value="own">Own</Option>
                      <Option value="rent">Rent</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="location"
                    label={
                      <span className="text-gray-700 font-medium">
                        Location
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter location" },
                    ]}
                  >
                    <Input
                      placeholder="Enter location"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="carAvailable"
                    label={
                      <span className="text-gray-700 font-medium">
                        Car Available
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select car availability",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select car availability"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Family Details Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">
                  Family Details
                </h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fatherOccupation"
                    label={
                      <span className="text-gray-700 font-medium">
                        Father&apos;s Occupation
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter father's occupation",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter father's occupation"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="motherOccupation"
                    label={
                      <span className="text-gray-700 font-medium">
                        Mother&apos;s Occupation
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter mother's occupation",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter mother's occupation"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="brothers"
                    label={
                      <span className="text-gray-700 font-medium">
                        Number of Brothers
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter number of brothers",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="brothersMarried"
                    label={
                      <span className="text-gray-700 font-medium">
                        Brothers Married
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter brothers married status",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    name="brothersDetails"
                    label={
                      <span className="text-gray-700 font-medium">
                        Brothers Details
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter brothers details",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter details about brothers (occupations, etc.)"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sisters"
                    label={
                      <span className="text-gray-700 font-medium">
                        Number of Sisters
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter number of sisters",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sistersMarried"
                    label={
                      <span className="text-gray-700 font-medium">
                        Sisters Married
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter sisters married status",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full rounded-lg border-rose-200 focus:border-rose-400"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    name="sistersDetails"
                    label={
                      <span className="text-gray-700 font-medium">
                        Sisters Details
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter sisters details",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter details about sisters (occupations, etc.)"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Address Section */}
            <Card
              title={
                <h2 className="text-xl font-serif text-rose-700">Address</h2>
              }
              className="mb-6 border border-rose-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    name="address"
                    label={
                      <span className="text-gray-700 font-medium">
                        Full Address
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter your address" },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter your full address"
                      className="rounded-lg border-rose-200 focus:border-rose-400"
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <div className="mt-8 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="h-12 px-8 text-lg font-medium bg-gradient-to-r from-rose-500 to-pink-500 border-none rounded-full shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Submit Profile
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RistaForm;
