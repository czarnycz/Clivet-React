import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import AuthenticationService from "../../services/authentication.service";
import { useNavigate } from "react-router-dom";




const AdminPage = () => {

    const [rows, setRows] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        AuthenticationService.getAll().then((response) => {
            setRows(response.data)
        })
    }, [])

    return (
        <div className="background">
            <div className="p-3 custom-card">
                
                <Table >
                    <TableHead>
                        <TableRow>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Pets </th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(
                                row =>
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.firstName}</td>
                                        <td>{row.lastName}</td>
                                        <td>
                                            <Button onClick={() => navigate(`/owners/${row.id}/petsList`)}>Details</Button>
                                        </td>
                                    </tr>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export { AdminPage }