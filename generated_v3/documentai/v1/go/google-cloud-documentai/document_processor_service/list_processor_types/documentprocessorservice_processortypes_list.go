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

// [START documentai_v1_documentprocessorservice_processortypes_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	documentaipb "cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listProcessorTypes retrieves all processor types available in the specified location.
func listProcessorTypes(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ListProcessorTypesRequest{
		Parent: parent,
	}

	it := client.ListProcessorTypes(ctx, req)
	for {
		pt, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve processor type: %w", err)
		}

		fmt.Fprintf(w, "Processor type: %s, category: %s\n", pt.GetType(), pt.GetCategory())
	}

	return nil
}

// [END documentai_v1_documentprocessorservice_processortypes_list]
