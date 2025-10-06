import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },

];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchText(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full lg:w-64 bg-white p-4 rounded-xl shadow-lg border border-gray-200 sticky top-6">
            <div className="flex items-center justify-between mb-3">
                <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
            </div>
            <hr className="border-gray-300 mb-4" />
            
            <RadioGroup value={selectedValue} onValueChange={handleChange} className="space-y-4">
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className="font-semibold text-md text-gray-700 mb-2">{data.filterType}</h1>
                        <div className="flex flex-col space-y-1">
                            {data.array.map((item, idx) => {
                                const itemId = `r${index}-${idx}`;
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                                    >
                                        <RadioGroupItem value={item} id={itemId} className="accent-[#6A38C2] w-4 h-4" />
                                        <Label htmlFor={itemId} className="text-gray-800 text-sm font-medium">{item}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
