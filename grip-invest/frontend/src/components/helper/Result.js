import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ResultTiles from './ResultTiles';


const Result = props => {

    const { emiMonthly, emiExtra, emiAmount} = props;

    const mapTotal = (emiExtra/emiAmount) * 100;
    const mapPrincipal = 100 - ((emiExtra/emiAmount) * 100);

    const options = {
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
          text: 'Break-up of Total Payment'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Amount',
            data: [
                {
                    name: 'Total Interest',
                    y: mapTotal
                },
                {
                    name: 'Principal Amount',
                    y: mapPrincipal
                }
            ]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300
                }
            }]
        }
      };

    return (
        <div  className="result__dashboard">
            <h1 className="text-center">Result</h1>
            <div className="">
                <div className="result__left text-center">
                    <ResultTiles name="Loan EMI" value={`&#8377;` +emiMonthly+``} />
                    <ResultTiles name="Total Interest" value={`&#8377;` +emiExtra+``} />
                    <ResultTiles name="Total (Principal + Interest)" value={`&#8377;` +emiAmount+``} />
                </div>
                <div className="result__right">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        </div>
    );
};


Result.propTypes = {
    emiMonthly: PropTypes.number,
    emiExtra: PropTypes.number,
    emiAmount: PropTypes.number
};


export default Result;
