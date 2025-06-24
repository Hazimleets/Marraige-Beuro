"use client";

import React from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import {
  HeartOutlined,
  TeamOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div className="border-0 border-red-600 mx-auto my-12 px-4 md:my-8 bg-gradient-to-b from-rose-50 to-white">
      {/* Vision Section */}
      <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl mb-12 border border-rose-100 bg-white/80 backdrop-blur-sm">
        <Title level={2} className="text-center mb-8 text-rose-800 font-serif">
          Our Vision
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="text-center p-6 rounded-xl bg-rose-50 hover:bg-rose-200 transition-all duration-300">
              <HeartOutlined className="text-5xl text-rose-400 mb-6" />
              <Title level={4} className="text-rose-700 font-serif">
                Trusted Matrimonial Service
              </Title>
              <Paragraph className="text-gray-600 leading-relaxed">
                We strive to be the most trusted matrimonial service, helping
                individuals find their perfect life partners through our secure
                and reliable platform.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="text-center p-6 rounded-xl bg-rose-50 hover:bg-rose-200 transition-all duration-300">
              <TeamOutlined className="text-5xl text-amber-400 mb-6" />
              <Title level={4} className="text-rose-700 font-serif">
                Community Building
              </Title>
              <Paragraph className="text-gray-600 leading-relaxed">
                Our mission is to build strong, lasting relationships within our
                community while respecting cultural values and traditions.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="text-center p-6 rounded-xl bg-rose-50 hover:bg-rose-200 transition-all duration-300">
              <SafetyOutlined className="text-5xl text-emerald-400 mb-6" />
              <Title level={4} className="text-rose-700 font-serif">
                Safe & Secure
              </Title>
              <Paragraph className="text-gray-600 leading-relaxed">
                We prioritize the safety and privacy of our users, ensuring a
                secure environment for finding meaningful connections.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Developer Section */}
      <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border border-rose-100 bg-white/80 backdrop-blur-sm">
        <Title level={2} className="text-center mb-8 text-rose-800 font-serif">
          Meet Our Developer
        </Title>
        <Row justify="center" align="middle" gutter={[32, 32]}>
          <Col xs={24} md={8} className="text-center">
            <div className="relative w-[120px] h-[120px] mx-auto mb-6">
              <Image
                src="https://res.cloudinary.com/du1slvjl7/image/upload/v1748686794/developer_gxp8mn.png"
                alt="Developer"
                fill
                className="rounded-full object-cover border-4 border-rose-200 shadow-lg"
              />
            </div>
            <Title level={3} className="text-rose-700 font-serif">
              Apna rights hi ha ! no tension
            </Title>
            <Paragraph className="text-amber-600 font-medium">
              Full Stack Developer
            </Paragraph>
          </Col>
          <Col xs={24} md={16}>
            <Paragraph className="text-gray-600 leading-relaxed">
              Hazim Waqar is a passionate full-stack developer with
              expertise in modern web technologies. He specializes in creating
              user-friendly applications that solve real-world problems.
            </Paragraph>
            <Divider className="border-rose-100" />
            {/* <Title level={4} className="text-rose-700 font-serif">
              Technical Expertise
            </Title>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>React.js & Next.js</li>
              <li>TypeScript</li>
              <li>Node.js</li>
              <li>Ant Design</li>
              <li>Tailwind CSS</li>
            </ul>
            <Divider className="border-rose-100" /> */}
            <Title level={4} className="text-rose-700 font-serif">
              Contact
            </Title>
            <Paragraph className="text-gray-600">
              Phone: <Link href="https://wa.me/923419385624" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-800 transition-colors duration-300">+92 341 9385624</Link>
              <br />
              Email: <Link href="mailto:frasatali120@gmail.com" className="text-rose-600 hover:text-rose-800 transition-colors duration-300">frasatali120@gmail.com</Link>
              <br />
              GitHub: <Link href="https://github.com/FrasatAliGujjar" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-800 transition-colors duration-300">https://github.com/FrasatAliGujjar</Link>
              <br />
              LinkedIn: <Link href="https://www.linkedin.com/in/frasataligujjar/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-800 transition-colors duration-300">https://www.linkedin.com/in/frasataligujjar/</Link>
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutPage;
