import React from "react";

export const Footer = () => {
  return (
    <footer className="absolute w-full bg-black text-white py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Online Chat</li>
              <li>WhatsApp</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          &copy; 2023 SURE, All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
