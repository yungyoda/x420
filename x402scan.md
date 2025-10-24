Register Resource
Add a resource to be tracked by x402scan.

Add Resource
Know of an x402 resource that isn't listed? Add it here.

https://
Advanced Configuration
Add
Validation Schema Definition
In order to be listed on x402scan, we check against a stricter schema than the default x402 schema. This allows us to present users with a UI that allows them to invoke the resources from within the app.

type X402Response = {
    x402Version: number,
    error?: string,
    accepts?: Array<Accepts>,
    payer?: string
}
  
type Accepts = {
    scheme: "exact",
    network: "base",
    maxAmountRequired: string,
    resource: string,
    description: string,
    mimeType: string,
    payTo: string,
    maxTimeoutSeconds: number,
    asset: string,

    // Optionally, schema describing the input and output expectations for the paid endpoint.
    outputSchema?: {
        input: {
        type: "http",
        method: "GET" | "POST",
        bodyType?: "json" | "form-data" | "multipart-form-data" | "text" | "binary",
        queryParams?: Record<string, FieldDef>,
        bodyFields?: Record<string, FieldDef>,
        headerFields?: Record<string, FieldDef>
        },
        output?: Record<string, any>
    },

    // Optionally, additional custom data the provider wants to include.
    extra?: Record<string, any>
}
    
type FieldDef = {
    type?: string,
    required?: boolean | string[],
    description?: string,
    enum?: string[],
    properties?: Record<string, FieldDef> // for nested objects
}