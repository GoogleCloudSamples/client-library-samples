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

// [START apigateway_v1_apigatewayservice_apis_list]

import (
	"context"
	"fmt"
	"io"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	apigatewaypb "cloud.google.com/go/apigateway/apiv1/apigatewaypb"
	"google.golang.org/api/iterator"
)

// listApis lists the APIs in the specified project.
func listApis(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.ListApisRequest{
		Parent: parent,
	}

	it := client.ListApis(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to read next API: %w", err)
		}
		fmt.Fprintf(w, "API: %s\n", resp.GetName())
	}

	return nil
}

// [END apigateway_v1_apigatewayservice_apis_list]
