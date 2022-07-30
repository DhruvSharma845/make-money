import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function CompaniesListing({companiesData}) {

    const columns = [
        { field: 'symbol', headerName: 'Symbol', width: 70 },
        { field: 'name', headerName: 'Company Name', width: 200 },
        { field: 'exchange', headerName: 'Exchange', width: 100 },
        { field: 'assetType', headerName: 'Asset Type', width: 90 },
      ];

    if(companiesData.error) {
        return <pre>{JSON.stringify(companiesData.error, null, 2)}</pre>;
    }
    if(companiesData.isLoading) {
        return (<p>Loading Companies listing...</p>);
    }
    else {
        return (<div>
            <h1>List of Active US Stocks and ETF:</h1>
            <div style={{ height: 1000, width: '100%' }}>
                <DataGrid
                    rows={companiesData.companies}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row.symbol}
                />
            </div>
        </div>);
    }
}

export default CompaniesListing;