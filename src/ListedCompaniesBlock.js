import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import CompaniesListing from './Companies';
import CustomSeachBlock from './SearchBlock';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ListedCompaniesBlock() {

    const [companySearchTerm, setCompanySearchTerm] = React.useState('GOOG');
    const [companiesListData, setCompaniesListData] = React.useState({isLoading: true, error: null, companies: []});

    const onSubmitCompanyTerm = (term) => {
        setCompanySearchTerm(term);
        setCompaniesListData({
            ...companiesListData,
            isLoading: true
        });
    };

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        console.log(`Companies List Size: ${newArray.length}`);
        return newArray;
    };

    React.useEffect(() => {
        if(!companySearchTerm) {
            return;
        }
        const API_KEY = 'JKCWI02F50XDCM1A';
        const LISTING_URL = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEY}`;
        fetch(LISTING_URL).then(result => result.text()).then(data => {
            const processedData = processCSV(data);
            const filteredData = processedData.filter(companyInfo => {
                return String(companyInfo.symbol).includes(companySearchTerm) 
                    || String(companyInfo.name).includes(companySearchTerm)
                    || String(companyInfo.exchange).includes(companySearchTerm)
                    || String(companyInfo.assetType).includes(companySearchTerm);
            })
            console.log(`Filtered Size: ${filteredData.length}`);
            setCompaniesListData({
                ...companiesListData,
                companies: filteredData,
                isLoading: false
            });
        }).catch(err => {
            setCompaniesListData({
                ...companiesListData,
                error: err
            })
        });
    }, [companySearchTerm]);

    return (
        <Item>
            <CustomSeachBlock value={companySearchTerm} onSubmitValue={onSubmitCompanyTerm} />
            <CompaniesListing companiesData={companiesListData} />
        </Item>
    );
}