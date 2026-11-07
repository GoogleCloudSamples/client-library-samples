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

// [START documentai_v1_documentprocessorservice_disable_processor]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
)

// disableProcessor disables an existing processor.
func disableProcessor(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processors/%s", projectID, locationID, processorID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	req := &documentaipb.DisableProcessorRequest{
		Name: name,
	}

	op, err := client.DisableProcessor(ctx, req)
	if err != nil {
		return fmt.Errorf("DisableProcessor: %w", err)
	}

	if _, err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Processor disabled: %s\n", name)

	return nil
}

// [END documentai_v1_documentprocessorservice_disable_processor]
