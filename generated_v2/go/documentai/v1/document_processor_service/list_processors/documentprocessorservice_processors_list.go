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

// [START documentai_v1_documentprocessorservice_processors_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listProcessors lists all processors in the specified project and location.
func listProcessors(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ListProcessorsRequest{
		Parent: parent,
	}

	it := client.ListProcessors(ctx, req)
	for {
		processor, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list processors: %w", err)
		}

		fmt.Fprintf(w, "Processor Name: %s\n", processor.GetName())
		fmt.Fprintf(w, "Display Name: %s\n", processor.GetDisplayName())
		fmt.Fprintf(w, "Type: %s\n", processor.GetType())
		fmt.Fprintf(w, "State: %s\n", processor.GetState())
	}

	return nil
}

// [END documentai_v1_documentprocessorservice_processors_list]
