import { calculateInvestmentResults, formatter } from '../util/investment'

const Result = ({ input }) => {
    console.log("result.jsx", input)
    const calResult = calculateInvestmentResults(input);
    const intialInvestment = calResult[0].valueEndOfYear - calResult[0].interest - calResult[0].annualInvestment
    console.log("Result.jsx", calResult)
    return (
        <>
            <table id="table_data">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Investment Value</th>
                        <th>Interest (Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        calResult.map((calData) => {
                            const totalInterestValue = calData.valueEndOfYear - calData.annualInvestment * calData.year - intialInvestment;
                            const totalAmountInvested = calData.valueEndOfYear -totalInterestValue
                            return <tr key={calData.year}>
                                <td>{calData.year}</td>
                                <td>{formatter.format(calData.valueEndOfYear)}</td>
                                <td>{formatter.format(calData.interest)}</td>
                                <td>{formatter.format(totalInterestValue)}</td>
                                <td>{formatter.format(totalAmountInvested)}</td>

                            </tr>
                        })
                    }
                </tbody>

            </table>
        </>
    )
}

export default Result;