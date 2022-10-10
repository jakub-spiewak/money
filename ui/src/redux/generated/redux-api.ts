import { api } from "../api";
export const addTagTypes = ["person-controller"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type UpdatePersonApiResponse = /** status 200 OK */ Unit;
export type UpdatePersonApiArg = {
  id: string;
  personRequest: PersonRequest;
};
export type DeletePersonApiResponse = /** status 200 OK */ Unit;
export type DeletePersonApiArg = {
  id: string;
};
export type ReadPersonApiResponse = /** status 200 OK */ PersonResponse[];
export type ReadPersonApiArg = void;
export type CreatePersonApiResponse = /** status 200 OK */ Unit;
export type CreatePersonApiArg = {
  personRequest: PersonRequest;
};
export type Unit = object;
export type PersonRequest = {
  firstName?: string;
  lastName?: string;
};
export type PersonResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
};
export const {
  useUpdatePersonMutation,
  useDeletePersonMutation,
  useReadPersonQuery,
  useCreatePersonMutation,
} = injectedRtkApi;
