import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { BsBookmark, BsArrowUpShort, BsCheckCircleFill } from 'react-icons/bs';

const ToolCard = ({ tool }) => {
  return (
    <Card className="h-100 p-3 shadow-sm rounded-4" style={{ background: '#f8f9fa' }}>
      <div className="d-flex align-items-start gap-3">
        <img
          src={tool.image}
          alt={tool.name}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-1">
            <h5 className="mb-0">{tool.name}</h5>
            {tool.verified && (
              <BsCheckCircleFill color="#5b7cfa" title="Verified" size={16} />
            )}
          </div>
          <small className="text-muted">{tool.description}</small>
        </div>
      </div>

      <hr className="my-2" />

      <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
        <div className="mb-2">
          {tool.tags.map((tag, index) => (
            <Badge
              key={index}
              bg="light"
              text="primary"
              className="me-1 mb-1"
              style={{ fontSize: '0.75rem' }}
            >
              #{tag.trim()}
            </Badge>
          ))}
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-muted d-flex align-items-center gap-1">
            <BsBookmark />
            <small>{tool.bookmarkCount}</small>
          </div>
          <div className="d-flex align-items-center gap-1" style={{ cursor: 'pointer' }}>
            <BsArrowUpShort size={20} color="green" />
            <small>{tool.upvoteCount}</small>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;