import {SingleExpenseForm} from "./expense-table/single/SingleExpenseForm";
import {ScheduledExpenseForm} from "./expense-table/scheduled/ScheduledExpenseForm";
import {DeleteScheduledExpenseDialog} from "./util/delete-conformation-dialogs/DeleteScheduledExpenseDialog";
import {DeleteSingleExpenseDialog} from "./util/delete-conformation-dialogs/DeleteSingleExpenseDialog";
import {DeleteSingleRevenueDialog} from "./util/delete-conformation-dialogs/DeleteSingleRevenueDialog";
import {DeleteScheduledRevenueDialog} from "./util/delete-conformation-dialogs/DeleteScheduledRevenueDialog";
import {SingleRevenueForm} from "./revenue-table/single/SingleRevenueForm";
import {ScheduledRevenueForm} from "./revenue-table/scheduled/ScheduledRevenueForm";
import {TagForm} from "./tag/TagForm";
import {DeleteTagDialog} from "./util/delete-conformation-dialogs/DeleteTagDialog";

export const Modals = () => (
    <>
        <SingleExpenseForm/>
        <ScheduledExpenseForm/>
        <SingleRevenueForm/>
        <ScheduledRevenueForm/>
        <TagForm/>

        <DeleteSingleExpenseDialog/>
        <DeleteScheduledExpenseDialog/>
        <DeleteSingleRevenueDialog/>
        <DeleteScheduledRevenueDialog/>
        <DeleteTagDialog/>
    </>
)