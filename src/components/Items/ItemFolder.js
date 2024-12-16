import React, { useState } from 'react';
import './ItemFolder.css';

const ItemFolder = ({ isVisible, onClose }) => {
    const [folderName, setFolderName] = useState('');

    const handleAddFolder = async () => {
        // Validation to ensure folder name is entered
        if (!folderName.trim()) {
            alert('Please enter a folder name.');
            return;
        }

        const newFolder = {
            name: folderName,
        };

        // Log the folder data before sending it
        console.log('Sending folder data:', newFolder);

        try {
            const response = await fetch('http://localhost:5000/api/inv/add-folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFolder),
            });

            if (!response.ok) {
                throw new Error('Failed to add folder');
            }

            const data = await response.json();
            console.log('Folder added:', data);
            alert(`Folder "${folderName}" added successfully!`);

            // Reset the modal
            onClose();
            setFolderName('');
        } catch (error) {
            console.error('Error adding folder:', error);
            alert('Failed to add folder');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-view">
                <h2>ADD FOLDER</h2>

                <label>Folder Name</label>
                <input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />

                <div className="modal-buttons">
                    <button className="add-button" onClick={handleAddFolder}>
                        Add
                    </button>
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemFolder;
