import React from 'react';
import { Drug } from '../types';
import QRCodeSVG from './QRCodeSVG';

interface PrintableSingleLabelSheetProps {
    drug: Drug;
    count: number;
}

const PrintableSingleLabelSheet: React.FC<PrintableSingleLabelSheetProps> = ({ drug, count }) => {
    // This component now generates a sequence of pages, each sized as a single label.
    // The browser's print dialog will interpret this as a continuous roll.
    return (
        <div className="label-sheet-container">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="label">
                    <div className="label-qrcode-wrapper">
                        {drug.internalBarcode && <QRCodeSVG value={drug.internalBarcode} />}
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
                        background: white !important; /* Ensure background is white for printing */
                    }

                    /* Hide the modal's own padding/background on the print output */
                    .printable-area {
                        padding: 0 !important;
                        background: transparent !important;
                    }

                    .label-sheet-container {
                        margin: 0;
                        padding: 0;
                    }

                    .label {
                        width: 100%; /* Fill the 4cm page width */
                        height: 100%; /* Fill the 3cm page height */
                        border: none !important; /* No border on the final printout */
                        padding: 2mm; /* Quiet zone for the QR code */
                        page-break-after: always; /* CRITICAL: Force a new label for the next element */
                    }
                }

                /* Screen-only styles for the preview modal */
                @media screen {
                     .label-sheet-container {
                        /* For preview, we display labels in a grid to show a sample */
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(8cm, 1fr));
                        gap: 1cm;
                        background-color: #e5e7eb; /* Light gray background to see white labels */
                        padding: 1cm;
                    }

                    .label {
                        width: 4cm;
                        height: 3cm;
                        border: 1px dashed #9ca3af;
                        padding: 2mm;
                        background-color: white;
                    }
                }
                
                /* Common styles for both screen and print */
                .label {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .label-qrcode-wrapper {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default PrintableSingleLabelSheet;