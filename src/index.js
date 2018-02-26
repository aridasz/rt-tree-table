import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import _ from 'lodash'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// pull in the HOC
import treeTableHOC from 'react-table/lib/hoc/treeTable';

import testData from './test_data';

// wrap ReacTable in it
// the HOC provides the configuration for the TreeTable
const TreeTable = treeTableHOC(ReactTable);

function getTdProps(state,ri,ci)
{
  console.log({state,ri,ci})
  return {};
}

// getTdProps={getTdProps}
// Expander={Expander}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: makeData()
      data: testData,
    };
  }
  render() {
    const { data } = this.state;
    // now use the new TreeTable component
    return (
      <div>
        <TreeTable
          data={data}
          pivotBy={['block','parentName','currency']}

          columns={[
            // we only require the accessor so TreeTable
            // can handle the pivot automatically
            
            
            // any other columns we want to display
			
			{
              Header: "Benchmark",
              accessor: "benchmark",
            },
			{
              Header: "Strategy Alloc",
              accessor: "stratAlloc",
            },
			{
              Header: "Tactical Alloc",
              accessor: "tactAlloc",
            },
			{
              accessor: "block",
            },
			{
              accessor: "parentName",
            },
            {
              accessor: "currency",
            },
            {
              Header: "Total",
              accessor: "total",
            },
            {
              Header: "Client ID",
              accessor: "clientID",
            },
            {
              Header: "Hold Type",
              accessor: "holdType",
            },
            {
              Header: "Country",
              accessor: "country",
            },
            {
              Header: "Asset Type",
              accessor: "assetType",
            },
            {
              Header: "YTM",
              accessor: "ytm",
            },
			{
              Header: "OAD",
              accessor: "oad",
            },
			{
              Header: "MV",
              accessor: "mv",
            },
			{
              Header: "Total MV",
              accessor: "totalmv",
            },
			{
              Header: "MVP",
              accessor: "mvp",
            },
			{
              Header: "Description",
              accessor: "description",
            },

          ]}

          defaultPageSize={10}

          SubComponent={(row)=>{
            // a SubComponent just for the final detail
            const columns = [
              { 
                Header: 'Property', 
                accessor: 'property',
                width: 200, 
                Cell: (ci) => { return `${ci.value}:`},
                style:
                {
                  backgroundColor:'#DDD', 
                  textAlign: 'right', 
                  fontWeight: 'bold'
                } 
              },
              { Header: 'Value', accessor: 'value' },
            ]
            const rowData = Object.keys(row.original).map((key)=>{
              return {
                property: key,
                value: row.original[key].toString(),
              }
            });
            return (
              <div style={{padding:'10px'}}>
                <ReactTable 
                  data={rowData}
                  columns={columns}
                  pageSize={rowData.length}
                  showPagination={false}
                />
              </div>
            );
          }}

        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
