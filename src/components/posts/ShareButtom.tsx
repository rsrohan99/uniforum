'use client'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import React from 'react';
import {FacebookIcon, Linkedin, Mail, Phone, Twitter} from "lucide-react";

interface ShareProps {
  link: string
}

const ShareButtom:React.FC<ShareProps> = ({ link }) => {
  return (
    <div className="flex flex-row gap-4 items-center w-full">
      <div className="hover:text-accent2">
        <FacebookShareButton url={link}>
          <FacebookIcon size={20}/>
        </FacebookShareButton>
      </div>
      <div className="hover:text-accent2">
        <TwitterShareButton url={link}>
          <Twitter size={20}/>
        </TwitterShareButton>
      </div>
      <div className="hover:text-accent2">
        <EmailShareButton url={link}>
          <Mail size={20}/>
        </EmailShareButton>
      </div>
      <div className="hover:text-accent2">
        <LinkedinShareButton url={link}>
          <Linkedin size={20}/>
        </LinkedinShareButton>
      </div>
      <div className="hover:text-accent2">
        <WhatsappShareButton url={link}>
          <Phone size={20}/>
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default ShareButtom;