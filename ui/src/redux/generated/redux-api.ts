import { api } from "../api";
export const addTagTypes = [
  "tag-controller",
  "revenue-controller",
  "person-controller",
  "expense-controller",
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
        invalidatesTags: ["tag-controller"],
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
        query: (queryArg) => ({ url: `/tag/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["tag-controller"],
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
        invalidatesTags: ["revenue-controller"],
      }),
      deleteRevenue: build.mutation<
        DeleteRevenueApiResponse,
        DeleteRevenueApiArg
      >({
        query: (queryArg) => ({
          url: `/revenue/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["revenue-controller"],
      }),
      updatePerson: build.mutation<UpdatePersonApiResponse, UpdatePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person/${queryArg.id}`,
            method: "PUT",
            body: queryArg.personRequest,
          }),
          invalidatesTags: ["person-controller"],
        }
      ),
      deletePerson: build.mutation<DeletePersonApiResponse, DeletePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["person-controller"],
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
        invalidatesTags: ["expense-controller"],
      }),
      deleteExpense: build.mutation<
        DeleteExpenseApiResponse,
        DeleteExpenseApiArg
      >({
        query: (queryArg) => ({
          url: `/expense/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["expense-controller"],
      }),
      readTag: build.query<ReadTagApiResponse, ReadTagApiArg>({
        query: () => ({ url: `/tag` }),
        providesTags: ["tag-controller"],
      }),
      createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
        query: (queryArg) => ({
          url: `/tag`,
          method: "POST",
          body: queryArg.tagRequest,
        }),
        invalidatesTags: ["tag-controller"],
      }),
      readRevenue: build.query<ReadRevenueApiResponse, ReadRevenueApiArg>({
        query: () => ({ url: `/revenue` }),
        providesTags: ["revenue-controller"],
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
        invalidatesTags: ["revenue-controller"],
      }),
      readPerson: build.query<ReadPersonApiResponse, ReadPersonApiArg>({
        query: () => ({ url: `/person` }),
        providesTags: ["person-controller"],
      }),
      createPerson: build.mutation<CreatePersonApiResponse, CreatePersonApiArg>(
        {
          query: (queryArg) => ({
            url: `/person`,
            method: "POST",
            body: queryArg.personRequest,
          }),
          invalidatesTags: ["person-controller"],
        }
      ),
      readExpense: build.query<ReadExpenseApiResponse, ReadExpenseApiArg>({
        query: () => ({ url: `/expense` }),
        providesTags: ["expense-controller"],
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
        invalidatesTags: ["expense-controller"],
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
} = injectedRtkApi;
