import React from 'react';


const OptionsWeather = ({title, option, valueSetting, icon}) => {
    return (
        <div className="option-card">
            {title} <span className="option-setting">{option} {valueSetting}</span>
        </div>
    );
};

export default OptionsWeather;