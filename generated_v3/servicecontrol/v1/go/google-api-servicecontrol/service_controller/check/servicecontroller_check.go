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

// [START servicecontrol_v1_servicecontroller_check]

import (
	"context"
	"fmt"
	"io"

	servicecontrol "cloud.google.com/go/servicecontrol/apiv1"
	"cloud.google.com/go/servicecontrol/apiv1/servicecontrolpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// check verifies consumer status and service activation with the Service Controller.
func check(ctx context.Context, w io.Writer, serviceName string) error {
	// Construct the operation payload to check consumer status and service state.
	operation := &servicecontrolpb.Operation{
		OperationId:   "4da71f5b-6a4f-4318-97ff-2bf0f9d92e8a",
		OperationName: "google.example.endpoint.v1.ExampleService.ExampleMethod",
		ConsumerId:    "project:example-consumer-project-id",
		StartTime:     timestamppb.Now(),
	}

	client, err := servicecontrol.NewServiceControllerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceControllerClient failed: %w", err)
	}
	defer client.Close()

	req := &servicecontrolpb.CheckRequest{
		ServiceName: serviceName,
		Operation:   operation,
	}

	resp, err := client.Check(ctx, req)
	if err != nil {
		return fmt.Errorf("client.Check failed: %w", err)
	}

	fmt.Fprintf(w, "Check response operation ID: %s\n", resp.GetOperationId())
	return nil
}

// [END servicecontrol_v1_servicecontroller_check]
