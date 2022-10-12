import { api } from "../api";
export const addTagTypes = [
  "tag",
  "revenue",
  "person",
  "expense",
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
      updateExpense: build.mutation<
        UpdateExpenseApiResponse,
        UpdateExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/${queryArg.id}`,
          method: "PUT",
          body: queryArg.expenseRequest,
        }),
        invalidatesTags: ["person", "tag", "expense"],
      }),
      deleteExpense: build.mutation<
        DeleteExpenseApiResponse,
        DeleteExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["person", "tag", "expense"],
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
      readExpense: build.query<ReadExpenseApiResponse, ReadExpenseApiArg>({
        query: () => ({ url: `/expense` }),
        providesTags: ["person", "tag", "expense"],
      }),
      createExpense: build.mutation<
        CreateExpenseApiResponse,
        CreateExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense`,
          method: "POST",
          body: queryArg.expenseRequest,
        }),
        invalidatesTags: ["person", "tag", "expense"],
      }),
      analyze: build.query<AnalyzeApiResponse, AnalyzeApiArg>({
        query: () => ({ url: `/analyze` }),
        providesTags: ["revenue", "person", "analyze", "tag", "expense"],
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
export type UpdateExpenseApiResponse = /** status 200 OK */ Unit;
export type UpdateExpenseApiArg = {
  id: string;
  expenseRequest: ExpenseRequest;
};
export type DeleteExpenseApiResponse = /** status 200 OK */ Unit;
export type DeleteExpenseApiArg = {
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
export type ReadExpenseApiResponse = /** status 200 OK */ ExpenseResponse[];
export type ReadExpenseApiArg = void;
export type CreateExpenseApiResponse = /** status 200 OK */ Unit;
export type CreateExpenseApiArg = {
  expenseRequest: ExpenseRequest;
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
  personId?: string;
};
export type PersonRequest = {
  firstName?: string;
  lastName?: string;
};
export type ExpenseRequest = {
  name?: string;
  amount?: number;
  person?: string;
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
export type ExpenseResponse = {
  id?: string;
  name?: string;
  amount?: number;
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
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useReadTagQuery,
  useCreateTagMutation,
  useReadRevenueQuery,
  useCreateRevenueMutation,
  useReadPersonQuery,
  useCreatePersonMutation,
  useReadExpenseQuery,
  useCreateExpenseMutation,
  useAnalyzeQuery,
} = injectedRtkApi;
