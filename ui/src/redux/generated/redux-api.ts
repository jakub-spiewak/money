import { api } from "../api";
export const addTagTypes = [
  "tag",
  "revenue",
  "person",
  "expense",
  "scheduled_expense",
  "analyze",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
        query: (queryArg) => ({
          url: `/tag/${queryArg.id}`,
          method: "PUT",
          body: queryArg.tagRequest,
        }),
        invalidatesTags: ["tag"],
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
        query: (queryArg) => ({ url: `/tag/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["tag"],
      }),
      updateRevenue: build.mutation<
        UpdateRevenueApiResponse,
        UpdateRevenueApiArg
      >({
        query: (queryArg) => ({
          url: `/revenue/${queryArg.id}`,
          method: "PUT",
          body: queryArg.revenueRequest,
        }),
        invalidatesTags: ["revenue", "person", "tag"],
      }),
      deleteRevenue: build.mutation<
        DeleteRevenueApiResponse,
        DeleteRevenueApiArg
      >({
        query: (queryArg) => ({
          url: `/revenue/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["revenue", "person", "tag"],
      }),
      updatePerson: build.mutation<UpdatePersonApiResponse, UpdatePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person/${queryArg.id}`,
            method: "PUT",
            body: queryArg.personRequest,
          }),
          invalidatesTags: ["person"],
        }
      ),
      deletePerson: build.mutation<DeletePersonApiResponse, DeletePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["person"],
        }
      ),
      updateSingleExpense: build.mutation<
        UpdateSingleExpenseApiResponse,
        UpdateSingleExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/single/${queryArg.id}`,
          method: "PUT",
          body: queryArg.singleExpenseRequest,
        }),
        invalidatesTags: ["person", "tag", "expense"],
      }),
      deleteSingleExpense: build.mutation<
        DeleteSingleExpenseApiResponse,
        DeleteSingleExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/single/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["person", "tag", "expense"],
      }),
      updateScheduledExpense: build.mutation<
        UpdateScheduledExpenseApiResponse,
        UpdateScheduledExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/scheduled/${queryArg.id}`,
          method: "PUT",
          body: queryArg.scheduledExpenseRequest,
        }),
        invalidatesTags: ["person", "scheduled_expense", "tag"],
      }),
      deleteScheduledExpense: build.mutation<
        DeleteScheduledExpenseApiResponse,
        DeleteScheduledExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/scheduled/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["person", "scheduled_expense", "tag"],
      }),
      readTag: build.query<ReadTagApiResponse, ReadTagApiArg>({
        query: () => ({ url: `/tag` }),
        providesTags: ["tag"],
      }),
      createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
        query: (queryArg) => ({
          url: `/tag`,
          method: "POST",
          body: queryArg.tagRequest,
        }),
        invalidatesTags: ["tag"],
      }),
      readRevenue: build.query<ReadRevenueApiResponse, ReadRevenueApiArg>({
        query: () => ({ url: `/revenue` }),
        providesTags: ["revenue", "person", "tag"],
      }),
      createRevenue: build.mutation<
        CreateRevenueApiResponse,
        CreateRevenueApiArg
      >({
        query: (queryArg) => ({
          url: `/revenue`,
          method: "POST",
          body: queryArg.revenueRequest,
        }),
        invalidatesTags: ["revenue", "person", "tag"],
      }),
      readPerson: build.query<ReadPersonApiResponse, ReadPersonApiArg>({
        query: () => ({ url: `/person` }),
        providesTags: ["person"],
      }),
      createPerson: build.mutation<CreatePersonApiResponse, CreatePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person`,
            method: "POST",
            body: queryArg.personRequest,
          }),
          invalidatesTags: ["person"],
        }
      ),
      readSingleExpense: build.query<
        ReadSingleExpenseApiResponse,
        ReadSingleExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/single`,
          params: { month: queryArg.month },
        }),
        providesTags: ["person", "tag", "expense"],
      }),
      createSingleExpense: build.mutation<
        CreateSingleExpenseApiResponse,
        CreateSingleExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/single`,
          method: "POST",
          body: queryArg.singleExpenseRequest,
        }),
        invalidatesTags: ["person", "tag", "expense"],
      }),
      readScheduledExpense: build.query<
        ReadScheduledExpenseApiResponse,
        ReadScheduledExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/scheduled`,
          params: { month: queryArg.month },
        }),
        providesTags: ["person", "scheduled_expense", "tag"],
      }),
      createScheduledExpense: build.mutation<
        CreateScheduledExpenseApiResponse,
        CreateScheduledExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/scheduled`,
          method: "POST",
          body: queryArg.scheduledExpenseRequest,
        }),
        invalidatesTags: ["person", "scheduled_expense", "tag"],
      }),
      analyze: build.query<AnalyzeApiResponse, AnalyzeApiArg>({
        query: () => ({ url: `/analyze` }),
        providesTags: [
          "revenue",
          "person",
          "analyze",
          "scheduled_expense",
          "tag",
        ],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type UpdateTagApiResponse = /** status 200 OK */ Unit;
export type UpdateTagApiArg = {
  id: string;
  tagRequest: TagRequest;
};
export type DeleteTagApiResponse = /** status 200 OK */ Unit;
export type DeleteTagApiArg = {
  id: string;
};
export type UpdateRevenueApiResponse = /** status 200 OK */ Unit;
export type UpdateRevenueApiArg = {
  id: string;
  revenueRequest: RevenueRequest;
};
export type DeleteRevenueApiResponse = /** status 200 OK */ Unit;
export type DeleteRevenueApiArg = {
  id: string;
};
export type UpdatePersonApiResponse = /** status 200 OK */ Unit;
export type UpdatePersonApiArg = {
  id: string;
  personRequest: PersonRequest;
};
export type DeletePersonApiResponse = /** status 200 OK */ Unit;
export type DeletePersonApiArg = {
  id: string;
};
export type UpdateSingleExpenseApiResponse = /** status 200 OK */ Unit;
export type UpdateSingleExpenseApiArg = {
  id: string;
  singleExpenseRequest: SingleExpenseRequest;
};
export type DeleteSingleExpenseApiResponse = /** status 200 OK */ Unit;
export type DeleteSingleExpenseApiArg = {
  id: string;
};
export type UpdateScheduledExpenseApiResponse = /** status 200 OK */ Unit;
export type UpdateScheduledExpenseApiArg = {
  id: string;
  scheduledExpenseRequest: ScheduledExpenseRequest;
};
export type DeleteScheduledExpenseApiResponse = /** status 200 OK */ Unit;
export type DeleteScheduledExpenseApiArg = {
  id: string;
};
export type ReadTagApiResponse = /** status 200 OK */ TagResponse[];
export type ReadTagApiArg = void;
export type CreateTagApiResponse = /** status 200 OK */ Unit;
export type CreateTagApiArg = {
  tagRequest: TagRequest;
};
export type ReadRevenueApiResponse = /** status 200 OK */ RevenueResponse[];
export type ReadRevenueApiArg = void;
export type CreateRevenueApiResponse = /** status 200 OK */ Unit;
export type CreateRevenueApiArg = {
  revenueRequest: RevenueRequest;
};
export type ReadPersonApiResponse = /** status 200 OK */ PersonResponse[];
export type ReadPersonApiArg = void;
export type CreatePersonApiResponse = /** status 200 OK */ Unit;
export type CreatePersonApiArg = {
  personRequest: PersonRequest;
};
export type ReadSingleExpenseApiResponse =
  /** status 200 OK */ SingleExpenseResponse[];
export type ReadSingleExpenseApiArg = {
  month?: string;
};
export type CreateSingleExpenseApiResponse = /** status 200 OK */ Unit;
export type CreateSingleExpenseApiArg = {
  singleExpenseRequest: SingleExpenseRequest;
};
export type ReadScheduledExpenseApiResponse =
  /** status 200 OK */ ScheduledExpenseResponse[];
export type ReadScheduledExpenseApiArg = {
  month?: string;
};
export type CreateScheduledExpenseApiResponse = /** status 200 OK */ Unit;
export type CreateScheduledExpenseApiArg = {
  scheduledExpenseRequest: ScheduledExpenseRequest;
};
export type AnalyzeApiResponse = /** status 200 OK */ AnalyzeResponse;
export type AnalyzeApiArg = void;
export type Unit = object;
export type TagRequest = {
  name?: string;
};
export type RevenueRequest = {
  name?: string;
  amount?: number;
  person?: string;
};
export type PersonRequest = {
  firstName?: string;
  lastName?: string;
};
export type SingleExpenseRequest = {
  name?: string;
  amount?: number;
  parentExpense?: string;
  person?: string;
  date?: string;
  tags?: string[];
};
export type AmountType = "RANGE" | "CONSTANT" | "PERCENTAGE" | "UNKNOWN";
export type AmountData = {
  value?: number;
  min?: number;
  max?: number;
  percentage?: number;
};
export type Amount = {
  type?: AmountType;
  data?: AmountData;
};
export type DateRange = {
  from?: string;
  to?: string;
};
export type ScheduledExpenseRequest = {
  name?: string;
  amount?: Amount;
  person?: string;
  date?: DateRange;
  tags?: string[];
};
export type TagResponse = {
  id?: string;
  name?: string;
};
export type PersonResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
};
export type RevenueResponse = {
  id?: string;
  name?: string;
  amount?: number;
  person?: PersonResponse;
};
export type SingleExpenseParentResponse = {
  id?: string;
  name?: string;
  amount?: number;
};
export type SingleExpenseResponse = {
  id?: string;
  name?: string;
  amount?: number;
  parentExpense?: SingleExpenseParentResponse;
  person?: PersonResponse;
  date?: string;
  tags?: TagResponse[];
};
export type ScheduledExpenseResponse = {
  id?: string;
  name?: string;
  amount?: Amount;
  date?: DateRange;
  person?: PersonResponse;
  tags?: TagResponse[];
};
export type ExpenseSummaryFromTag = {
  name?: string;
  amount?: number;
  part?: number;
};
export type TagSummary = {
  name?: string;
  amount?: number;
  expenses?: ExpenseSummaryFromTag[];
  partOfRevenues?: number;
  partOfExpenses?: number;
};
export type AnalyzeResponse = {
  revenueAmountSum?: number;
  expensesAmountSum?: number;
  savingAmountSum?: number;
  savingPart?: number;
  expensesPart?: number;
  tags?: TagSummary[];
};
export const {
  useUpdateTagMutation,
  useDeleteTagMutation,
  useUpdateRevenueMutation,
  useDeleteRevenueMutation,
  useUpdatePersonMutation,
  useDeletePersonMutation,
  useUpdateSingleExpenseMutation,
  useDeleteSingleExpenseMutation,
  useUpdateScheduledExpenseMutation,
  useDeleteScheduledExpenseMutation,
  useReadTagQuery,
  useCreateTagMutation,
  useReadRevenueQuery,
  useCreateRevenueMutation,
  useReadPersonQuery,
  useCreatePersonMutation,
  useReadSingleExpenseQuery,
  useCreateSingleExpenseMutation,
  useReadScheduledExpenseQuery,
  useCreateScheduledExpenseMutation,
  useAnalyzeQuery,
} = injectedRtkApi;
