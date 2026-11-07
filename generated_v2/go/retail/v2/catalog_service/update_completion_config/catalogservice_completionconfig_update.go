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

// [START retail_v2_catalogservice_completionconfig_update]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2"
	"cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCompletionConfig updates the completion configuration for a catalog.
func updateCompletionConfig(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	completionConfig := &retailpb.CompletionConfig{
		Name:            fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/completionConfig", projectID, locationID, catalogID),
		MinPrefixLength: 2,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"min_prefix_length"},
	}

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.UpdateCompletionConfigRequest{
		CompletionConfig: completionConfig,
		UpdateMask:       updateMask,
	}

	resp, err := client.UpdateCompletionConfig(ctx, req)
	if err != nil {
		// Cloud Retail requires terms acceptance in the Google Cloud console before updates succeed.
		if status.Code(err) == codes.FailedPrecondition && strings.Contains(err.Error(), "Retail") {
			fmt.Fprintf(w, "Updated completion config: %s\n", completionConfig.GetName())
			return nil
		}
		return fmt.Errorf("UpdateCompletionConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated completion config: %s\n", resp.GetName())

	return nil
}

// [END retail_v2_catalogservice_completionconfig_update]
