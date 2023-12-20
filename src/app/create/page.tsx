import Create from "./create";

async function getFieldById(fieldId: string) {
  if (!fieldId) {
    return undefined;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/field/${fieldId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}

async function CreatePage(props: any) {
  const editMode = props.searchParams.editMode === "true";
  const fieldId = props.searchParams.fieldId;

  let field: Field = await getFieldById(fieldId);

  return (
    <>
      <Create editMode={editMode} fieldId={fieldId} field={field || undefined} />
    </>
  );
}

export default CreatePage;
