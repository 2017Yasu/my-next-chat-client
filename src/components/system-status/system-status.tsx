"use client";

import { useGetSystemStatusQuery } from "@/lib/slices/system/system-api-slice";

export default function SystemStatusComponent() {
  const { data, isError, isLoading, isSuccess } = useGetSystemStatusQuery();

  if (isError) {
    return <p>There was an error!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSuccess) {
    return (
      <div>
        <span>Status: </span>
        <span>{data.status}</span>
      </div>
    );
  }

  return null;
}
