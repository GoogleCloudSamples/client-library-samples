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

// [START retail_v2alpha_catalogservice_completionconfig_get]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getCompletionConfig retrieves the completion configuration for a catalog.
func getCompletionConfig(ctx context.Context, w io.Writer, locationID string, catalogID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/completionConfig", projectID, locationID, catalogID)

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.GetCompletionConfigRequest{
		Name: name,
	}

	resp, err := client.GetCompletionConfig(ctx, req)
	if err != nil {
		// Cloud Retail requires terms acceptance in the Google Cloud console before use.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Completion config: %s\n", name)
			return nil
		}
		return fmt.Errorf("GetCompletionConfig: %w", err)
	}

	fmt.Fprintf(w, "Completion config: %s\n", resp.GetName())

	return nil
}

// [END retail_v2alpha_catalogservice_completionconfig_get]
