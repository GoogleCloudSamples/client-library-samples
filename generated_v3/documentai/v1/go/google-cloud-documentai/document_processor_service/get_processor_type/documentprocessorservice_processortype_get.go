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

// [START documentai_v1_documentprocessorservice_processortype_get]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// getProcessorType gets details of a Document AI processor type.
func getProcessorType(ctx context.Context, w io.Writer, projectID string, locationID string, processorTypeID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processorTypes/%s", projectID, locationID, processorTypeID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.GetProcessorTypeRequest{
		Name: name,
	}

	resp, err := client.GetProcessorType(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProcessorType failed: %w", err)
	}

	fmt.Fprintf(w, "Processor type name: %s\n", resp.GetName())
	fmt.Fprintf(w, "Type: %s\n", resp.GetType())
	fmt.Fprintf(w, "Category: %s\n", resp.GetCategory())
	fmt.Fprintf(w, "Allow creation: %t\n", resp.GetAllowCreation())

	return nil
}

// [END documentai_v1_documentprocessorservice_processortype_get]
