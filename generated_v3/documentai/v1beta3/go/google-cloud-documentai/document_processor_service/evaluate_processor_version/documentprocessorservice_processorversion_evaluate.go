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

// [START documentai_v1beta3_documentprocessorservice_evaluate_processor_version]

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

// evaluateProcessorVersion starts an evaluation for a processor version and waits for it to complete.
func evaluateProcessorVersion(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string, processorVersionID string) error {
	processorVersion := fmt.Sprintf("projects/%s/locations/%s/processors/%s/processorVersions/%s", projectID, locationID, processorID, processorVersionID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient: %w", err)
	}
	defer client.Close()

	req := &documentaipb.EvaluateProcessorVersionRequest{
		ProcessorVersion: processorVersion,
	}

	op, err := client.EvaluateProcessorVersion(ctx, req)
	if err != nil {
		// Processors without an initialized dataset return FailedPrecondition.
		if s, ok := status.FromError(err); ok && s.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Evaluation precondition not met: %s\n", s.Message())
			return nil
		}
		return fmt.Errorf("EvaluateProcessorVersion: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if s, ok := status.FromError(err); ok && s.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Evaluation precondition not met: %s\n", s.Message())
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Evaluation created: %s\n", resp.GetEvaluation())
	return nil
}

// [END documentai_v1beta3_documentprocessorservice_evaluate_processor_version]
