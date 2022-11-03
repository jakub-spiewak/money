import {SingleExpenseForm} from "./expense/single/SingleExpenseForm";
import {ScheduledExpenseForm} from "./expense/scheduled/ScheduledExpenseForm";
import {DeleteScheduledExpenseDialog} from "./util/delete-conformation-dialogs/DeleteScheduledExpenseDialog";
import {DeleteSingleExpenseDialog} from "./util/delete-conformation-dialogs/DeleteSingleExpenseDialog";

export const Modals = () => (
    <>
        <SingleExpenseForm/>
        <DeleteSingleExpenseDialog/>
        <ScheduledExpenseForm/>
        <DeleteScheduledExpenseDialog/>
    </>
)