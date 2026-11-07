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

// [START apigateway_v1_apigatewayservice_api_update]

import (
	"context"
	"fmt"
	"io"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	apigatewaypb "cloud.google.com/go/apigateway/apiv1/apigatewaypb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateApi updates the display name of an existing API.
func updateApi(ctx context.Context, w io.Writer, projectID string, apiID string) error {
	api := &apigatewaypb.Api{
		Name:        fmt.Sprintf("projects/%s/locations/global/apis/%s", projectID, apiID),
		DisplayName: "Updated API",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.UpdateApiRequest{
		Api:        api,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateApi(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateApi failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated API: %s\n", resp.GetName())
	return nil
}

// [END apigateway_v1_apigatewayservice_api_update]
