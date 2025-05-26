import React from 'react';
import styled from 'styled-components';

// Estilo para la vista previa
const PreviewContainer = styled.div`
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  overflow-y: auto;
  padding: 1em;
`;

const PreviewHeader = styled.h3`
  margin-bottom: 10px;    
  font-size: 1.5rem;
  color: #333;
`;

interface LivePreviewProps {
  htmlContent: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlContent }) => {
  return (
    <PreviewHeader>Live Preview:
        <PreviewContainer>
        {/* dangerouslySetInnerHTML for rendering the html inside */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </PreviewContainer>
    </PreviewHeader>
  );
};

export default LivePreview;
