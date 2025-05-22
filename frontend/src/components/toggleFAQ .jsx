import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long does the review process take?",
      answer:
        "Our team typically reviews submissions within 3-5 business days. You'll receive an email notification once your tool has been approved or if we need additional information.",
    },
    {
      question: "What types of AI tools can be submitted?",
      answer:
        "We accept all types of AI-powered tools including text, image, voice, video, and code generation, as well as analysis tools, chatbots, and more. The tool must be functional and provide value to users.",
    },
    {
      question: "What metrics will I be able to see?",
      answer:
        "You'll have access to metrics such as page views, click-through rates, user ratings, and usage statistics through our developer dashboard.",
    },
    {
      question: "Can I integrate my tool directly into McCarthy?",
      answer:
        "Yes, we offer integration options that allow users to access your tool directly from McCarthy. This requires providing an embed URL or API integration.",
    },
    {
      question: "Can I update my tool information after submission?",
      answer:
        "Yes, you can update your tool information at any time through the developer dashboard. Changes may require review before going live.",
    },
    {
      question: "Is there a cost to list my tool?",
      answer:
        "Basic listings are free. We also offer premium placements and featured spots for a fee. Contact our team for more information on promotional opportunities.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      style={{
        padding: "8rem 1rem", // Increased vertical padding for more height
        backgroundColor: "#f9f9f9",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              marginBottom: "1rem",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid #eee",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => toggleFAQ(index)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "600",
                fontSize: "1rem",
                color: "#333",
              }}
            >
              {faq.question}
              <span>{activeIndex === index ? "✖" : "+"}</span>
            </div>
            {activeIndex === index && (
              <p
                style={{
                  marginTop: "0.75rem",
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
