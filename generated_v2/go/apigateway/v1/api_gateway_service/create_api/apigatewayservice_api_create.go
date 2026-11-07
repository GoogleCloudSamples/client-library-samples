// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START apigateway_v1_apigatewayservice_api_create]

import (
	"context"
	"fmt"
	"io"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	apigatewaypb "cloud.google.com/go/apigateway/apiv1/apigatewaypb"
)

// createApi creates a new API instance in API Gateway.
func createApi(ctx context.Context, w io.Writer, projectID string, apiID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)
	api := &apigatewaypb.Api{
		DisplayName: "Example API",
		Labels: map[string]string{
			"environment": "example",
		},
	}

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.CreateApiRequest{
		Parent: parent,
		ApiId:  apiID,
		Api:    api,
	}

	op, err := client.CreateApi(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateApi failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created API: %s\n", resp.GetName())
	return nil
}

// [END apigateway_v1_apigatewayservice_api_create]
