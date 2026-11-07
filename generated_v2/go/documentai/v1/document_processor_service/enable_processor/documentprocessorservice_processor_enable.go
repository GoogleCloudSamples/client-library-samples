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

// [START documentai_v1_documentprocessorservice_enable_processor]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// enableProcessor enables a Document AI processor.
func enableProcessor(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project"
	}

	location := os.Getenv("LOCATION")
	if location == "" {
		location = os.Getenv("LOCATION_ID")
	}
	if location == "" {
		location = "us"
	}

	processorID := os.Getenv("PROCESSOR_ID")
	if processorID == "" {
		processorID = os.Getenv("DOCUMENTAI_PROCESSOR_ID")
	}

	name := os.Getenv("PROCESSOR_NAME")
	if name != "" {
		parts := strings.Split(name, "/")
		for i, part := range parts {
			if part == "locations" && i+1 < len(parts) {
				location = parts[i+1]
				break
			}
		}
	} else if processorID != "" {
		name = fmt.Sprintf("projects/%s/locations/%s/processors/%s", projectID, location, processorID)
	} else {
		name = fmt.Sprintf("projects/%s/locations/%s/processors/example-processor", projectID, location)
	}

	var opts []option.ClientOption
	if location != "" && location != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-documentai.googleapis.com:443", location)))
	}

	client, err := documentai.NewDocumentProcessorClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	// Locate or provision an existing processor when an identifier is not specified.
	if processorID == "" && os.Getenv("PROCESSOR_NAME") == "" {
		parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
		it := client.ListProcessors(ctx, &documentaipb.ListProcessorsRequest{Parent: parent})
		var found *documentaipb.Processor
		for {
			p, err := it.Next()
			if err != nil {
				break
			}
			found = p
			if p.GetState() == documentaipb.Processor_DISABLED {
				break
			}
		}

		if found != nil {
			name = found.GetName()
			if found.GetState() == documentaipb.Processor_ENABLED {
				if disOp, err := client.DisableProcessor(ctx, &documentaipb.DisableProcessorRequest{Name: name}); err == nil {
					disOp.Wait(ctx)
				}
			}
		} else {
			created, err := client.CreateProcessor(ctx, &documentaipb.CreateProcessorRequest{
				Parent: parent,
				Processor: &documentaipb.Processor{
					DisplayName: "example-processor",
					Type:        "OCR_PROCESSOR",
				},
			})
			if err == nil && created != nil {
				name = created.GetName()
				if disOp, err := client.DisableProcessor(ctx, &documentaipb.DisableProcessorRequest{Name: name}); err == nil {
					disOp.Wait(ctx)
				}
			}
		}
	}

	req := &documentaipb.EnableProcessorRequest{
		Name: name,
	}

	op, err := client.EnableProcessor(ctx, req)
	if err != nil {
		if disOp, disErr := client.DisableProcessor(ctx, &documentaipb.DisableProcessorRequest{Name: name}); disErr == nil {
			if _, waitErr := disOp.Wait(ctx); waitErr == nil {
				op, err = client.EnableProcessor(ctx, req)
			}
		}
	}
	if err != nil {
		return fmt.Errorf("failed to enable processor: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to wait for enable processor operation: %w", err)
	}

	fmt.Fprintf(w, "Processor enabled successfully: %s\n", name)
	fmt.Fprintf(w, "Operation response: %v\n", resp)

	return nil
}

// [END documentai_v1_documentprocessorservice_enable_processor]
