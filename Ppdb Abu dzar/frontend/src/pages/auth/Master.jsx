import React, { useState } from 'react';
import { SignUp } from './sign-up';
import PemilihanJenjang from './PemilihanJenjang';
import AkunLogin from './AkunLogin';

const Master = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [selectedData, setSelectedData] = useState('');

    const handleNext = (data) => {
        setFormData(data);
        setStep(step + 1);
    };

    const handleFinalSubmit = (data) => {
        setSelectedData(data.selectedData);
        setStep(step + 1);
    };

    return (
        <div>
            {/* {formData ? (
                <PemilihanJenjang formData={formData} />
            ) : (
                <SignUp onRegister={handleFormSubmit} />
            )} */}
            {step === 1 && <SignUp onNext={handleNext} />}
            {step === 2 && <PemilihanJenjang formData={formData} onNext={handleFinalSubmit} />}
            {step === 3 && <AkunLogin formData={formData} selectedData={selectedData} />}
        </div>
    );
};
export default Master;