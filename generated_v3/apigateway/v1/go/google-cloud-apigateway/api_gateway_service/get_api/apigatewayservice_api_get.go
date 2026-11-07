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

// [START apigateway_v1_apigatewayservice_api_get]

import (
	"context"
	"fmt"
	"io"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	apigatewaypb "cloud.google.com/go/apigateway/apiv1/apigatewaypb"
)

// getApi retrieves details of an API Gateway API.
func getApi(ctx context.Context, w io.Writer, projectID string, apiID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/apis/%s", projectID, apiID)

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.GetApiRequest{
		Name: name,
	}

	resp, err := client.GetApi(ctx, req)
	if err != nil {
		return fmt.Errorf("GetApi: %w", err)
	}

	fmt.Fprintf(w, "Retrieved API: %s\n", resp.GetName())
	return nil
}

// [END apigateway_v1_apigatewayservice_api_get]
