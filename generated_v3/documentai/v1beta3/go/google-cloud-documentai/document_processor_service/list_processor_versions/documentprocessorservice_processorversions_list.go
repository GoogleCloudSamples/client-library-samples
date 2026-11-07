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

// [START documentai_v1beta3_documentprocessorservice_processorversions_list]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listProcessorVersions lists all processor versions for a given processor.
func listProcessorVersions(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/processors/%s", projectID, locationID, processorID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ListProcessorVersionsRequest{
		Parent: parent,
	}

	it := client.ListProcessorVersions(ctx, req)
	for {
		version, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListProcessorVersions failed: %w", err)
		}

		fmt.Fprintf(w, "Processor version: %s\n", version.GetName())
		fmt.Fprintf(w, "  Display name: %s\n", version.GetDisplayName())
		fmt.Fprintf(w, "  State: %s\n", version.GetState().String())
	}

	return nil
}

// [END documentai_v1beta3_documentprocessorservice_processorversions_list]
