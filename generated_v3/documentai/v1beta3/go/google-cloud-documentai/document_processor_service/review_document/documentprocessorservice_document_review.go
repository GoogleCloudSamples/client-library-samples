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

// [START documentai_v1beta3_documentprocessorservice_review_document]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// reviewDocument sends a document for human review and waits for the operation to complete.
func reviewDocument(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string) error {
	humanReviewConfig := fmt.Sprintf("projects/%s/locations/%s/processors/%s/humanReviewConfig", projectID, locationID, processorID)
	inlineDocument := &documentaipb.Document{
		MimeType: "application/pdf",
		Text:     "Sample invoice text for review.",
	}

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ReviewDocumentRequest{
		HumanReviewConfig: humanReviewConfig,
		Source: &documentaipb.ReviewDocumentRequest_InlineDocument{
			InlineDocument: inlineDocument,
		},
		Priority: documentaipb.ReviewDocumentRequest_DEFAULT,
	}

	op, err := client.ReviewDocument(ctx, req)
	if err != nil {
		// Processors without human review configured return a FailedPrecondition status.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Human review is not enabled for processor: %s\n", processorID)
			return nil
		}
		return fmt.Errorf("ReviewDocument failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Human review is not enabled for processor: %s\n", processorID)
			return nil
		}
		return fmt.Errorf("operation failed: %w", err)
	}

	fmt.Fprintf(w, "Review completed. Destination: %s\n", resp.GetGcsDestination())
	return nil
}

// [END documentai_v1beta3_documentprocessorservice_review_document]
