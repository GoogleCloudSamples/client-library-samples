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

// [START apigateway_v1_apigatewayservice_apiconfig_delete]

import (
	"context"
	"fmt"
	"io"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	apigatewaypb "cloud.google.com/go/apigateway/apiv1/apigatewaypb"
)

// deleteApiConfig deletes an existing API config.
func deleteApiConfig(ctx context.Context, w io.Writer, projectID string, apiID string, apiConfigID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/apis/%s/configs/%s", projectID, apiID, apiConfigID)

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.DeleteApiConfigRequest{
		Name: name,
	}

	op, err := client.DeleteApiConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteApiConfig failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted API config: %s\n", name)
	return nil
}

// [END apigateway_v1_apigatewayservice_apiconfig_delete]
