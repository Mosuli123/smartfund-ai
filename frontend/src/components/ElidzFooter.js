import React from 'react';

const ElidzFooter = () => {
  return (
    <footer className="elidz-gradient-primary text-white font-elidz">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="elidz-animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-elidz-accent">ELIDZ SmartFund AI</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering Small, Medium & Micro Enterprises through intelligent funding solutions and AI-powered matching.
            </p>
          </div>
          
          <div className="elidz-animate-fade-in elidz-animation-delay-1000">
            <h4 className="font-bold mb-4 text-elidz-accent">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-elidz-accent transition-colors duration-200 hover:underline">About ELIDZ</a></li>
              <li><a href="#" className="hover:text-elidz-accent transition-colors duration-200 hover:underline">Funding Opportunities</a></li>
              <li><a href="#" className="hover:text-elidz-accent transition-colors duration-200 hover:underline">Success Stories</a></li>
              <li><a href="#" className="hover:text-elidz-accent transition-colors duration-200 hover:underline">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="elidz-animate-fade-in elidz-animation-delay-2000">
            <h4 className="font-bold mb-4 text-elidz-accent">Key Industries</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center"><span className="w-2 h-2 bg-elidz-accent rounded-full mr-2"></span>Manufacturing</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-elidz-accent rounded-full mr-2"></span>Automotive</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-elidz-accent rounded-full mr-2"></span>Agriculture</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-elidz-accent rounded-full mr-2"></span>ICT & Electronics</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-elidz-accent rounded-full mr-2"></span>Renewable Energy</li>
            </ul>
          </div>
          
          <div className="elidz-animate-fade-in elidz-animation-delay-4000">
            <h4 className="font-bold mb-4 text-elidz-accent">Contact Info</h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-start"><span className="text-elidz-accent mr-2">📍</span>East London Industrial Development Zone<br/>Eastern Cape, South Africa</p>
              <p className="flex items-center"><span className="text-elidz-accent mr-2">✉️</span>info@elidz.co.za</p>
              <p className="flex items-center"><span className="text-elidz-accent mr-2">📞</span>+27 43 702 8200</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-8 text-center">
          <p className="text-white/80 text-sm mb-2">
            © 2024 East London Industrial Development Zone. All rights reserved.
          </p>
          <p className="text-elidz-accent text-sm font-semibold">
            SmartFund AI - Revolutionizing SMME Access to Funding
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ElidzFooter;