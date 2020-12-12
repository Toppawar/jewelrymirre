
import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';


const DataTable = ({
    rows,
    columns,
    ...props
}) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection {...props} />
        </div>
    )
}

export default DataTable;