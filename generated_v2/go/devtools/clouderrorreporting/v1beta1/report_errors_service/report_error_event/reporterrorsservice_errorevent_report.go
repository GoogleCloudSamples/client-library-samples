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

// [START clouderrorreporting_v1beta1_reporterrorsservice_report_error_event]

import (
	"context"
	"fmt"
	"io"

	clouderrorreporting "cloud.google.com/go/errorreporting/apiv1beta1"
	clouderrorreportingpb "cloud.google.com/go/errorreporting/apiv1beta1/errorreportingpb"
)

// reportErrorEvent reports an error event to Error Reporting.
func reportErrorEvent(ctx context.Context, w io.Writer, projectID string) error {
	projectName := fmt.Sprintf("projects/%s", projectID)
	event := &clouderrorreportingpb.ReportedErrorEvent{
		ServiceContext: &clouderrorreportingpb.ServiceContext{
			Service: "example-service",
			Version: "1.0.0",
		},
		Message: "Exception: example error occurred\n\tat com.example.Worker.run(Worker.java:54)",
	}

	client, err := clouderrorreporting.NewReportErrorsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReportErrorsClient failed: %w", err)
	}
	defer client.Close()

	req := &clouderrorreportingpb.ReportErrorEventRequest{
		ProjectName: projectName,
		Event:       event,
	}

	if _, err := client.ReportErrorEvent(ctx, req); err != nil {
		return fmt.Errorf("ReportErrorEvent failed: %w", err)
	}

	fmt.Fprintf(w, "Reported error event successfully\n")
	return nil
}

// [END clouderrorreporting_v1beta1_reporterrorsservice_report_error_event]
