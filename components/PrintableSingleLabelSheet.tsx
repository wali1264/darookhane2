import React from 'react';
import { Drug } from '../types';
import QRCodeSVG from './QRCodeSVG';

interface PrintableSingleLabelSheetProps {
    drug: Drug;
    count: number;
}

const PrintableSingleLabelSheet: React.FC<PrintableSingleLabelSheetProps> = ({ drug, count }) => {
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
                .label-sheet-container {
                    display: grid;
                    /* Define a grid with columns that are ~5cm wide, auto-filling as many as fit */
                    grid-template-columns: repeat(auto-fill, 5cm);
                    gap: 2mm; /* A small gap between labels, useful for roll printers */
                    justify-content: center; /* Center the grid in the preview modal */
                    background-color: white;
                }
                .label {
                    width: 5cm;
                    height: 5cm;
                    border: 1px dashed #ccc; /* Visible in preview, hidden on print */
                    padding: 4mm; /* This creates the "quiet zone" around the QR code */
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    page-break-inside: avoid; /* Tries to prevent a label from splitting across pages */
                }
                .label-qrcode-wrapper {
                    width: 100%;
                    height: 100%;
                }

                @media print {
                    @page {
                        size: A4 portrait; /* Use a standard virtual page size. The printer driver will handle the rest. */
                        margin: 1cm; /* Standard printer margin */
                    }
                    body, html {
                        background: white !important; /* Ensure background is white for printing */
                    }
                    .label-sheet-container {
                        /* On print, let the grid flow naturally from the top-left */
                        justify-content: flex-start;
                        gap: 0; /* No gap needed on final printout, labels are contiguous on a roll */
                    }
                    .label {
                        border: none; /* No dashed border on the final printout */
                        padding: 3mm; /* Slightly smaller padding for print to maximize QR code size */
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintableSingleLabelSheet;