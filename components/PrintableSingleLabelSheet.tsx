import React from 'react';
import { Drug } from '../types';
import QRCodeSVG from './QRCodeSVG';

interface PrintableSingleLabelSheetProps {
    drug: Drug;
    count: number;
}

const PrintableSingleLabelSheet: React.FC<PrintableSingleLabelSheetProps> = ({ drug, count }) => {
    // The component structure is now a container with individual "page" wrappers for each label.
    // This provides a cleaner structure for CSS page-break rules to avoid browser rendering bugs.
    return (
        <div className="label-sheet-container">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="label-page">
                    <div className="label-content">
                        <div className="label-qrcode-wrapper">
                            {drug.internalBarcode && <QRCodeSVG value={drug.internalBarcode} />}
                        </div>
                    </div>
                </div>
            ))}
            <style>{`
                /* Print-specific styles take precedence */
                @media print {
                    /* Define the exact size of each physical label for the printer driver */
                    @page {
                        size: 4cm 3cm;
                        margin: 0;
                    }

                    body, html {
                        background: white !important;
                    }
                    .printable-area {
                        padding: 0 !important;
                        background: transparent !important;
                    }
                    .label-sheet-container {
                        margin: 0;
                        padding: 0;
                    }

                    /* Each label-page represents one full page in the print context. */
                    .label-page {
                        width: 4cm;
                        height: 3cm;
                        overflow: hidden;
                        page-break-after: always; /* Force a new label for the next element */
                        box-sizing: border-box;
                    }

                    /* The content inside the page, with padding for the quiet zone. */
                    .label-content {
                        width: 100%;
                        height: 100%;
                        padding: 2mm; /* Quiet zone for the QR code */
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                /* Screen-only styles for the preview modal */
                @media screen {
                     .label-sheet-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(8cm, 1fr));
                        gap: 1cm;
                        background-color: #e5e7eb;
                        padding: 1cm;
                    }

                    .label-page {
                        width: 4cm;
                        height: 3cm;
                        border: 1px dashed #9ca3af;
                        background-color: white;
                        display: flex; /* Added for centering in preview */
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    
                    .label-content {
                        width: 100%;
                        height: 100%;
                        padding: 2mm;
                        box-sizing: border-box;
                    }
                }
                
                /* Common styles */
                .label-qrcode-wrapper {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default PrintableSingleLabelSheet;
